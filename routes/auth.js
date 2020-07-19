const router = require("express").Router();
const { passport } = require("../services/spotify");

router.get(
  "/auth",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "user-top-read",
      "user-read-recently-played",
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-modify-playback-state",
      "streaming",
    ],
    showDialog: true,
  }),
  function (req, res) {}
);

router.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
