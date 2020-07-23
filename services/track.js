const artistRepository = require("../repository/artist");
const albumRepository = require("../repository/album");
const trackRepository = require("../repository/track");
const artistService = require("./artist");
const albumService = require("./album");
const { spotifyApi } = require("./spotify");
const { sleep } = require("../utils/util");

//TODO refactor this function so it makes less request to spotify

async function insertTrack(trackId, track) {
  if (!track) {
    await sleep(300);
    track = await spotifyApi.getTrack(trackId);
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

      if (!artist) artist = await artistService.insertArtist(trackArtist.id);

      trackData.artists.push(artist._id);
    }
  }

  return await trackRepository.insertTrack(trackData);
}

async function insertTracks(albumId) {
  let album = await albumRepository.getAlbum({ id: albumId });

  if (!album) album = await albumService.insertAlbum(albumId);

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

      track = await insertTrack(track.id, track);

      album.tracks.push(track._id);
    }
    await albumRepository.updateAlbum(album.id, { tracks: album.tracks });
  }
}

module.exports = {
  insertTrack,
  insertTracks,
};
