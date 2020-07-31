const Album = require("mongoose").model("Album");

async function insertAlbum(newData) {
  try {
    let album = await getAlbum({ spotifyId: newData.id });
    if (!album) {
      album = new Album(newData);
      await album.save();
    }
    return album;
  } catch (e) {
    console.log(e);
  }
}

async function updateAlbum(id, newData) {
  try {
    const updateQuery = { $set: newData };
    return await Album.updateOne({ spotifyId: id }, updateQuery, {
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

module.exports = {
  insertAlbum,
  updateAlbum,
  getAlbum,
};
