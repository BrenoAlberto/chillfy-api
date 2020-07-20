const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    profilePic: {
      type: mongoose.SchemaTypes.Mixed,
    },
    displayName: {
      type: String,
      required: true,
    },
    spotifyId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
