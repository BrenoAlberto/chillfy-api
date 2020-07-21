const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    name: {
      type: String,
      required: true,
    },
    track_number: Number,
    duration_ms: Number,
    explicit: Boolean,
    is_playable: Boolean,
    href: String,
    uri: String,
    samples: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    sampledIn: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  },
  {
    timestamps: true,
  }
);

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;
