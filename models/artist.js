const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  images: Array,
  genres: [String],
  name: {
    type: String,
    required: true,
  },
  href: String,
  uri: String,
});

const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;
