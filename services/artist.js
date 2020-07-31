const artistRepository = require("../repository/artist");

//TODO refactor this function so it makes less request to spotify

async function insertArtist(spotifyApi, artistId) {
  try {
    let artist = await artistRepository.getArtist({ spotifyId: artistId });

    if (!artist) {
      await spotifyApi.sleep(300);
      artist = (await spotifyApi.getArtist(artistId)).body;

      const artistData = {
        spotifyId: artist.id,
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

async function getsertArtist(spotifyApi, artistId) {
  let artist = await artistRepository.getArtist({ spotifyId: artistId });
  if (!artist) artist = await insertArtist(spotifyApi, artistId);
  return artist;
}

module.exports = {
  insertArtist,
  getsertArtist,
};
