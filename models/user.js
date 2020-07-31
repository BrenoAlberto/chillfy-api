const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    spotifyId: String,
    accessToken: String,
    refreshToken: String,
    refreshAt: String,
    profilePic: String,
    displayName: String,
    country: String,
    email: String,
    contributionPoints: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
