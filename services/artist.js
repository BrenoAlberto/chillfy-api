const artistRepository = require("../repository/artist");
const { sleep } = require("../utils/util");

//TODO refactor this function so it makes less request to spotify

async function insertArtist(spotifyApi, artistId) {
  try {
    let artist = await artistRepository.getArtist({ id: artistId });

    if (!artist) {
      await sleep(300);
      artist = (await spotifyApi.getArtist(artistId)).body;

      const artistData = {
        id: artist.id,
        images: artist.images,
        genres: artist.genres,
        name: artist.name,
        href: artist.href,
        uri: artist.uri,
      };

      artist = await artistRepository.insertArtist(artistData);
    }

    return artist;
  } catch (e) {
    return null;
  }
}

module.exports = {
  insertArtist,
};
