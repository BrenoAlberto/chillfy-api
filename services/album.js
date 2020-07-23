const albumRepository = require("../repository/album");
const artistService = require("./artist");
const artistRepository = require("../repository/artist");
const { spotifyApi } = require("./spotify");
const { sleep } = require("../utils/util");

//TODO refactor this function so it makes less request to spotify

async function insertAlbum(albumId, album) {
  const registeredAlbum = await albumRepository.getAlbum({ id: albumId });

  if (!registeredAlbum) {
    if (!album) {
      sleep(500);
      album = await (await spotifyApi.getAlbum(albumId)).body;
    }

    const albumData = {
      id: album.id,
      album_type: album.album_type,
      artists: [],
      // genres: album.
      href: album.href,
      images: album.images,
      name: album.name,
      release_date: album.release_date,
      release_date_precision: album.release_date_precision,
      tracks: [],
      uri: album.uri,
    };

    for (let z = 0; z < album.artists.length; z++) {
      const albumArtist = album.artists[z];
      let artist = await artistRepository.getArtist({
        id: albumArtist.id,
      });

      if (!artist) artist = await artistService.insertArtist(albumArtist.id);

      albumData.artists.push(artist._id);
    }

    return await albumRepository.insertAlbum(albumData);
  } else {
    return registeredAlbum;
  }
}

async function insertAlbums(artistId) {
  sleep(500);
  let albums = (await spotifyApi.getArtistAlbums(artistId)).body.items;

  const ids = [];
  for (let i = 0; i < albums.length; i++) {
    const album = albums[i];

    ids.push((await insertAlbum(album.id, album)).id);
  }

  return ids;
}

module.exports = {
  insertAlbum,
  insertAlbums,
};
