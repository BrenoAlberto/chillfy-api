const Queue = require("mongoose").model("Queue");
// const { queueErr } = require("../util/err");

async function insertItem(data) {
  try {
    const newItem = new Queue(data);
    return await newItem.save();
  } catch (e) {
    // throw queueErr.ERROR_INSERTING_ITEM;
  }
}

async function updateItem(_id, newData) {
  try {
    const updateQuery = { $set: newData };
    return await Queue.findOneAndUpdate({ _id }, updateQuery, {
      new: true,
    }).exec();
  } catch (e) {}
}

async function getQueue(conditions = {}, sort = { _id: -1 }) {
  try {
    return await Queue.find(conditions).sort(sort).exec();
  } catch (e) {
    // throw queueErr.ERROR_READING_QUEUE;
  }
}

module.exports = {
  insertItem,
  getQueue,
  updateItem,
};
