const v8 = require("v8");
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const structuredClone = (obj) => {
  return v8.deserialize(v8.serialize(obj));
};

module.exports = {
  sleep,
  structuredClone,
};
