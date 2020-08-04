const artistRepository = require("../repository/artist");

//TODO refactor this function so it makes less request to spotify

async function _insertArtist(spotifyApi, spotifyArtistId) {
  try {
    let artist = await artistRepository.getArtist({ spotifyArtistId });

    if (!artist) {
      await spotifyApi.sleep(300);
      artist = (await spotifyApi.getArtist(spotifyArtistId)).body;

      const newArtistData = _setArtistData(artist);

      artist = await artistRepository.insertArtist(newArtistData);
    }

    return artist;
  } catch (e) {
    return null;
  }
}

function _setArtistData({ id, images, genres, name, href, uri }) {
  return {
    spotifyArtistId: id,
    images,
    genres,
    name,
    href,
    uri,
  };
}

async function getsertArtist(spotifyApi, spotifyArtistId) {
  let artist = await artistRepository.getArtist({ spotifyArtistId });
  if (!artist) artist = await _insertArtist(spotifyApi, spotifyArtistId);
  return artist;
}

module.exports = {
  getsertArtist,
};
