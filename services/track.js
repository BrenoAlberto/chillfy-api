const artistRepository = require("../repository/artist");
const albumRepository = require("../repository/album");
const trackRepository = require("../repository/track");
const artistService = require("./artist");
const albumService = require("./album");
const searchService = require("./search");
const { sleep } = require("../utils/util");

//TODO refactor this function so it makes less request to spotify

async function insertTrack(spotifyApi, trackId, track) {
  const alreadyRegisteredTrack = await trackRepository.getTrack({
    id: trackId,
  });

  if (!alreadyRegisteredTrack) {
    if (!track) {
      await sleep(300);
      track = (await spotifyApi.getTrack(trackId)).body;
    }

    const trackData = {
      id: track.id,
      name: track.name,
      track_number: track.track_number,
      duration_ms: track.duration_ms,
      explicit: track.explicit,
      is_playable: track.is_playable,
      href: track.href,
      uri: track.uri,
      artists: [],
    };

    if (track.artists) {
      for (let z = 0; z < track.artists.length; z++) {
        const trackArtist = track.artists[z];
        let artist = await artistRepository.getArtist({
          id: trackArtist.id,
        });

        if (!artist)
          artist = await artistService.insertArtist(spotifyApi, trackArtist.id);

        trackData.artists.push(artist._id);
      }
    }

    return await trackRepository.insertTrack(trackData);
  }
  return alreadyRegisteredTrack;
}

async function insertTracks(spotifyApi, albumId) {
  let album = await albumRepository.getAlbum({ id: albumId });

  if (!album) album = await albumService.insertAlbum(spotifyApi, albumId);

  const registeredTracks = await trackRepository.getTracks({
    album: album._id,
  });

  await sleep(300);
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

  if (!registeredTracks || registeredTracks.length !== tracks.length) {
    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];

      track = await insertTrack(spotifyApi, track.id, track);

      album.tracks.push(track._id);
    }
    await albumRepository.updateAlbum(album.id, { tracks: album.tracks });
  }
}

const insertSample = async (
  spotifyApi,
  trackId,
  sampledId,
  sampleType,
  trackData,
  sampleData
) => {
  let track;
  let sample;

  if (trackId) {
    track = await trackRepository.getTrack({ id: trackId });
    if (!track) track = await insertTrack(spotifyApi, id);
  } else if (trackData) {
    const query = `${trackData.artist} ${trackData.track}`;
    const searchResult = (
      await searchService.search(spotifyApi, query, ["track"])
    ).tracks;
    const searchItems = searchResult.items;

    if (searchItems) {
      //TODO more result checks
      track = await insertTrack(spotifyApi, searchItems[0].id);
    }
  }

  if (sampledId) {
    sample = await trackRepository.getTrack({ id: sampleId });
    if (!sample) sample = await insertTrack(spotifyApi, sampleId);
  } else if (sampleData) {
    const query = `${sampleData.artist} ${sampleData.track}`;
    const searchResult = (
      await searchService.search(spotifyApi, query, ["track"])
    ).tracks;
    const searchItems = searchResult.items;

    //TODO more result checks
    if (searchItems.length && searchItems[0].id)
      sample = await insertTrack(spotifyApi, searchItems[0].id);
  }

  if (track && sample) {
    const newSample = { id: sample._id, type: sampleType };

    if (track.samples) {
      let alreadyRegistered = false;
      track.samples.forEach((registeredSample) => {
        if (registeredSample.id === newSample.id) alreadyRegistered = true;
      });
      if (!alreadyRegistered) {
        track.samples.push(newSample);
      }
    } else {
      track.samples = [newSample];
    }

    return await trackRepository.updateTrack(trackId, {
      samples: track.samples,
    });
  }
};

module.exports = {
  insertTrack,
  insertTracks,
  insertSample,
};
