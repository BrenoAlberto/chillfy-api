const albumRepository = require("../repository/album");
const trackRepository = require("../repository/track");
const artistService = require("./artist");
const albumService = require("./album");
const searchService = require("./search");
const { pushReferenceToDocument } = require("../utils/mongo");
const { structuredClone } = require("../utils/util");

async function insertSample(
  spotifyApi,
  spotifyTrackId,
  spotifySampleId,
  sampleType,
  trackData,
  sampleData
) {
  let track = await getsertTrack(spotifyApi, spotifyTrackId, trackData);
  const sample = await getsertTrack(spotifyApi, spotifySampleId, sampleData);

  if (track && sample) {
    track = _pushSampleToTrack(track, sample, sampleType);

    return await trackRepository.updateTrack(spotifyTrackId, {
      samples: track.samples,
    });
  }
}

async function getsertTrack(spotifyApi, spotifyTrackId, trackData) {
  let track;
  if (spotifyTrackId) {
    track = await trackRepository.getTrack({ spotifyTrackId });
    if (!track) track = await _insertTrack(spotifyApi, spotifyTrackId);
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

async function getsertAlbumTracks(spotifyApi, spotifyAlbumId) {
  let album = await albumService.getsertAlbum(spotifyApi, spotifyAlbumId);

  if (!album.allTracksSaved) {
    await spotifyApi.sleep(300);
    const tracks = await _fetchAlbumTracks(spotifyApi, spotifyAlbumId);

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track.album = album.spotifyAlbumId;

      track = await _insertTrack(spotifyApi, track.id, track);

      pushReferenceToDocument(album, track._id, "tracks");
    }

    await albumRepository.updateAlbum(album.spotifyAlbumId, {
      tracks: album.tracks,
      allTracksSaved: true,
    });
  }

  //TODO group tracks and albuns before return
  return await trackRepository.getTracks({
    album: album._id,
  });
}

async function _insertTrack(spotifyApi, spotifyTrackId, track) {
  if (!track) {
    await spotifyApi.sleep(300);
    track = (await spotifyApi.getTrack(spotifyTrackId)).body;
  }

  const newTrackData = _setTrackData(track);
  const album = await albumService.getsertAlbum(spotifyApi, track.album);
  newTrackData.album = album._id;

  for (let i = 0; i < track.artists.length; i++) {
    const trackArtist = track.artists[i];
    const trackArtistId = trackArtist.id ? trackArtist.id : trackArtist; //TODO check this

    const artist = await artistService.getsertArtist(spotifyApi, trackArtistId);

    pushReferenceToDocument(newTrackData, artist._id, "artists");
  }

  return await trackRepository.insertTrack(newTrackData);
}

//TODO maybe rename this
async function _fetchAlbumTracks(spotifyApi, spotifyAlbumId) {
  let response = await spotifyApi.getAlbumTracks(spotifyAlbumId, { limit: 50 });
  let tracks = response.body.items;
  const totalPages = response.body.total / 50;

  for (let i = 0; i <= totalPages.length; i++) {
    const offset = i * 50;

    response = await spotifyApi.getAlbumTracks(spotifyAlbumId, {
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
    spotifyTrackId: id,
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
  getsertTrack,
  getsertAlbumTracks,
  insertSample,
  searchTrack,
};
