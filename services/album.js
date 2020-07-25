const albumRepository = require("../repository/album");
const artistService = require("./artist");
const artistRepository = require("../repository/artist");
const { sleep } = require("../utils/util");

//TODO refactor this function so it makes less request to spotify

async function insertAlbum(spotifyApi, albumId, album) {
  const registeredAlbum = await albumRepository.getAlbum({ id: albumId });

  if (!registeredAlbum) {
    if (!album) {
      await sleep(300);
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

    if (album.artists) {
      for (let z = 0; z < album.artists.length; z++) {
        const albumArtist = album.artists[z];
        let artist = await artistRepository.getArtist({
          id: albumArtist.id,
        });

        if (!artist)
          artist = await artistService.insertArtist(spotifyApi, albumArtist.id);

        albumData.artists.push(artist._id);
      }
    }

    return await albumRepository.insertAlbum(albumData);
  } else {
    return registeredAlbum;
  }
}

async function insertAlbums(spotifyApi, artistId) {
  await sleep(300);
  let response = await spotifyApi.getArtistAlbums(artistId, {
    include_groups: "album,single",
    limit: 50,
  });
  let albums = response.body.items;
  const totalPages = response.body.total / 50;

  for (let i = 1; i <= totalPages; i++) {
    const offset = i * 50;

    response = await spotifyApi.getArtistAlbums(artistId, {
      limit: 50,
      offset,
    });

    albums = albums.concat(response.body.items);
  }

  const ids = [];

  for (let i = 0; i < albums.length; i++) {
    const album = albums[i];

    ids.push((await insertAlbum(spotifyApi, album.id, album)).id);
  }

  return ids;
}

module.exports = {
  insertAlbum,
  insertAlbums,
};
