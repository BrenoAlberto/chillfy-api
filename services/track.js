const albumRepository = require("../repository/album");
const trackRepository = require("../repository/track");
const artistService = require("./artist");
const albumService = require("./album");
const searchService = require("./search");
const { pushReferenceToDocument } = require("../utils/mongo");
const { structuredClone } = require("../utils/util");

async function insertSample(
  spotifyApi,
  trackId,
  sampledId,
  sampleType,
  trackData,
  sampleData
) {
  let track = await getSertTrack(spotifyApi, trackId, trackData);
  const sample = await getSertTrack(spotifyApi, sampledId, sampleData);

  if (track && sample) {
    track = _pushSampleToTrack(track, sample, sampleType);

    return await trackRepository.updateTrack(trackId, {
      samples: track.samples,
    });
  }
}

async function getSertTrack(spotifyApi, id, trackData) {
  let track;
  if (id) {
    track = await trackRepository.getTrack({ spotifyId: id });
    if (!track) track = await _insertTrack(spotifyApi, id);
  } else {
    const searchResultItems = await searchTrack(spotifyApi, trackData);

    //TODO more result checks
    if (searchResuPltItems.length && searchResultItems[0].id)
      track = await _insertTrack(spotifyApi, searchResultItems[0].id);
  }
  return track;
}

async function searchTrack(spotifyApi, { artist, track }) {
  const query = `${artist} ${track}`;
  const searchResult = (
    await searchService.search(spotifyApi, query, ["track"])
  ).tracks;
  return searchResult.items;
}

async function getSertAlbumTracks(spotifyApi, albumId) {
  let album = await albumService.getSertAlbum(spotifyApi, albumId);

  if (!album.allTracksSaved) {
    await spotifyApi.sleep(300);
    const tracks = await _fetchAlbumTracks(spotifyApi, albumId);

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];

      track = await _insertTrack(spotifyApi, track.id, track);

      album = pushReferenceToDocument(album, track._id, "tracks");
    }

    await albumRepository.updateAlbum(album.spotifyId, {
      tracks: album.tracks,
    });
  }

  return await trackRepository.getTracks({
    album: album._id,
  });
}

async function _insertTrack(spotifyApi, trackId, track) {
  if (!track) {
    await spotifyApi.sleep(300);
    track = (await spotifyApi.getTrack(trackId)).body;
  }

  const newTrackData = _setTrackData(track);
  const album = await albumService.getSertAlbum(spotifyApi, track.album);
  newTrackData.album = album._id;

  for (let i = 0; i < track.artists.length; i++) {
    const trackArtist = track.artists[i];
    const trackArtistId = trackArtist.id ? trackArtist.id : trackArtist;

    const artist = await artistService.getSertArtist(spotifyApi, trackArtistId);

    pushReferenceToDocument(newTrackData, artist._id, "artists");
  }

  return await trackRepository.insertTrack(newTrackData);
}

//TODO maybe rename this
async function _fetchAlbumTracks(spotifyApi, albumId) {
  let response = await spotifyApi.getAlbumTracks(albumId, { limit: 50 });
  let tracks = response.body.items;
  const totalPages = response.body.total / 50;

  for (let i = 0; i <= totalPages.length; i++) {
    const offset = i * 50;

    response = await spotifyApi.getAlbumTracks(albumId, {
      limit: 50,
      offset,
    });

    tracks = tracks.concat(response.body.items);
  }

  return tracks;
}

const _setTrackData = ({
  id,
  name,
  track_number,
  duration_ms,
  explicit,
  is_playable,
  href,
  uri,
}) => {
  return structuredClone({
    spotifyId: id,
    name,
    track_number,
    duration_ms,
    explicit,
    is_playable,
    href,
    uri,
    artists: [],
  });
};

function _pushSampleToTrack(track, sample, sampleType) {
  const newSample = { _id: sample._id, type: sampleType };

  if (track.samples) {
    let alreadyRegistered = false;
    track.samples.forEach((registeredSample) => {
      if (registeredSample._id === newSample._id) alreadyRegistered = true;
    });
    if (!alreadyRegistered) track.samples.push(newSample);
  } else {
    track.samples = [newSample];
  }

  return track;
}

module.exports = {
  getSertTrack,
  getSertAlbumTracks,
  insertSample,
  searchTrack,
};
