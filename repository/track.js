const Track = require("mongoose").model("Track");

async function insertTrack(newData) {
  try {
    const track = new Track(newData);
    await track.save();
    track.populate("album").populate("artists").populate("samples._id");
    return track;
  } catch (e) {
    console.log(e);
  }
}

async function updateTrack(id, newData) {
  try {
    const updateQuery = { $set: newData };
    return await Track.findOneAndUpdate({ spotifyId: id }, updateQuery, {
      new: true,
    })
      .populate("album")
      .populate("artists")
      .populate("samples._id")
      .exec();
  } catch (e) {
    console.log(e);
  }
}

async function getTrack(conditions, optionalFields = {}) {
  try {
    const track = await Track.findOne(conditions, optionalFields)
      .populate("album")
      .populate("artists")
      .populate("samples._id")
      .exec();
    return track;
  } catch (e) {
    console.log(e);
    // return authErr.ERROR_READING_USER;
  }
}

async function getTracks(conditions, optionalFields = {}) {
  try {
    return await Track.find(conditions, optionalFields)
      .populate("album")
      .populate("artists")
      .populate("samples._id")
      .exec();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  insertTrack,
  updateTrack,
  getTrack,
  getTracks,
};
