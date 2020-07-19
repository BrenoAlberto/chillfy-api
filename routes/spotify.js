const router = require("express").Router();
const {
  spotifyApi,
  ensureAuthenticated,
  passport,
} = require("../services/spotify");

router.get(
  "/auth",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "user-top-read",
      "user-read-currently-playing",
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

router.get("/top/:type", ensureAuthenticated, async (req, res) => {
  const type = req.params.type.toLowerCase();
  const result = [];

  if (type === "artists") {
    const topArtists = (await spotifyApi.getMyTopArtists()).body.items;
    topArtists.forEach((artist) => {
      result.push(artist.name);
    });
  } else if (type === "tracks") {
    const topTracks = (await spotifyApi.getMyTopTracks()).body.items;
    topTracks.forEach((track) => {
      result.push(track.name);
    });
  }

  return res.status(200).json(result);
});

module.exports = router;
