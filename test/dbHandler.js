const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongod.getConnectionString();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10,
    useFindAndModify: false,
  };
  await mongoose.connect(uri, mongooseOpts);
};

module.exports.importModels = () => {
  require("../models");
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  mongoose.connection.close();
  mongod.stop();
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
