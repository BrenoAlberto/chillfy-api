const Artist = require("mongoose").model("Artist");

async function insertArtist(newData) {
  try {
    let artist = await getArtist({ spotifyId: newData.id });
    if (!artist) {
      artist = new Artist(newData);
      await artist.save();
    }
    return artist;
  } catch (e) {
    console.log(e);
  }
}

async function getArtist(conditions, optionalFields = {}) {
  try {
    const artist = await Artist.findOne(conditions, optionalFields).exec();
    return artist;
  } catch (e) {
    console.log(e);
    // return authErr.ERROR_READING_USER;
  }
}

module.exports = {
  insertArtist,
  getArtist,
};
