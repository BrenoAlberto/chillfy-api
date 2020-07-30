const mongoose = require("mongoose");

const dbHandler = require("../dbHandler");
dbHandler.importModels();
const queueRepository = require("../../repository/queue");

jest.setTimeout(30000);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Queue Repository ", () => {
  describe("Insert item", () => {
    it("When provided item data, insert successfully and get item", async () => {
      const item = await queueRepository.insertItem(queueItemComplete);
      expect(item.type).toEqual(queueItemComplete.type);
      expect(item.priority).toEqual(queueItemComplete.priority);
    });
  });
  describe("Update item", () => {
    it("When updating priority and status, get updated item", async () => {
      let item = await queueRepository.insertItem(queueItemComplete);
      item = await queueRepository.updateItem(
        item._id,
        itemUpdatePriorityAndStatus
      );

      expect(item).toMatchObject(itemUpdatePriorityAndStatus);
    });
  });
  describe("Get queue", () => {
    it("When complete item provided, insert successfully ", async () => {
      const item1 = Object.assign({}, queueItemComplete);
      const item2 = Object.assign({}, queueItemComplete);
      const item3 = Object.assign({}, queueItemComplete);
      const item4 = Object.assign({}, queueItemComplete);

      item1.priority = 1;
      item4.priority = 3;
      item2.status = "completed";

      await queueRepository.insertItem(item1);
      await queueRepository.insertItem(item2);
      await queueRepository.insertItem(item3);
      await queueRepository.insertItem(item4);

      const queue = await queueRepository.getQueue(
        queueQuery.conditions,
        queueQuery.sort
      );

      expect(queue[0].priority).toEqual(1);
      expect(queue[queue.length - 1].priority).toEqual(3);
      expect(queue).not.toContainEqual(
        expect.objectContaining({ status: "completed" })
      );
    });
  });
});

const queueItemComplete = {
  type: "getSamples",
  data: {},
  date: Date.now(),
  priority: 2,
  status: "pending",
};

const itemUpdatePriorityAndStatus = {
  priority: 1,
  status: "completed",
};

const queueQuery = {
  conditions: {
    type: "getSamples",
    status: "pending",
  },
  sort: {
    date: 1,
    priority: 1,
  },
};
