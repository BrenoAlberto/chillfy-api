const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true,
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
  samples: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Track" },
      sample_ms: Number,
      type: {
        type: String,
        enum: ["sample", "sampledIn", "coveredIn"],
      },
      // contributors: [{type: }]
      // verified: {
      //   type: Boolean,
      //   default: false,
      // },
    },
  ],
  ws_crawled: Boolean,
});

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;
