const artist = require("./artist");
const auth = require("./auth");
const player = require("./player");
const search = require("./search");
const stats = require("./stats");
const track = require("./track");

const routes = {
  artist,
  auth,
  player,
  search,
  stats,
  track,
};

module.exports = routes;
