const Queue = require("mongoose").model("Queue");
// const { queueErr } = require("../util/err");

async function insertItem(data) {
  try {
    const newItem = new Queue(data);
    await newItem.save();
    return newItem;
  } catch (e) {
    // throw queueErr.ERROR_INSERTING_ITEM;
  }
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
};
