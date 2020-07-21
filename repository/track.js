const Track = require("mongoose").model("Track");

async function insertTrack(newData) {
  try {
    let track = await getTrack({ id: newData.id });
    if (!track) {
      track = new Track(newData);
      await track.save();
    }
    return track;
  } catch (e) {
    console.log(e);
  }
}

async function updateTrack(id, newData) {
  try {
    const updateQuery = { $set: newData };
    return await Track.updateOne({ id }, updateQuery, { new: true }).exec();
  } catch (e) {
    console.log(e);
  }
}

async function getTrack(conditions, optionalFields = {}) {
  try {
    const track = await Track.findOne(conditions, optionalFields)
      .populate("album")
      .populate("artists")
      .populate("samples")
      .populate("sampledIn")
      .exec();
    return track;
  } catch (e) {
    console.log(e);
    // return authErr.ERROR_READING_USER;
  }
}

async function getTracks(conditions, optionalFields = {}) {
  try {
    const tracks = await Track.find(conditions, optionalFields)
      .populate("album")
      .populate("artists")
      .populate("samples")
      .populate("sampledIn")
      .exec();
    return tracks;
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