const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    data: mongoose.Schema.Types.Mixed,
    date: Date,
    priority: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
      default: 3,
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      required: true,
    },
  },
  {
    strict: true,
  }
);

const Queue = mongoose.model("Queue", queueSchema);
module.exports = Queue;
