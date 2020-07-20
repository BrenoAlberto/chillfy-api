const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  album_type: {
    type: String,
    enum: ["album", "single", "compilation"],
  },
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
  genres: [String],
  href: String,
  images: Array,
  name: {
    type: String,
    required: true,
  },
  release_date: String,
  release_date_precision: String,
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  uri: String,
});

const Album = mongoose.model("Album", AlbumSchema);
module.exports = Album;
