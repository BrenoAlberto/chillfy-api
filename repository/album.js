const Album = require("mongoose").model("Album");

async function insertAlbum(newData) {
  try {
    const album = new Album(newData);
    await album.save();
    return album;
  } catch (e) {
    console.log(e);
  }
}

async function updateAlbum(spotifyAlbumId, newData) {
  try {
    const updateQuery = { $set: newData };
    return await Album.updateOne({ spotifyAlbumId }, updateQuery, {
      new: true,
    }).exec();
  } catch (e) {
    console.log(e);
  }
}

async function getAlbum(conditions, optionalFields = {}) {
  try {
    const album = await Album.findOne(conditions, optionalFields)
      .populate("artists")
      .populate("tracks")
      .exec();
    return album;
  } catch (e) {
    console.log(e);
    // return authErr.ERROR_READING_USER;
  }
}

async function getAlbums(conditions, optionalFields = {}) {
  try {
    const albums = await Album.find(conditions, optionalFields)
      .populate("artists")
      .populate("tracks")
      .exec();
    return albums;
  } catch (e) {
    console.log(e);
    // return authErr.ERROR_READING_USER;
  }
}

module.exports = {
  insertAlbum,
  updateAlbum,
  getAlbum,
  getAlbums,
};
