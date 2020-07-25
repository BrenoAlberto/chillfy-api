const router = require("express").Router();
const { ensureAuthenticated, setSpotifyApi } = require("../services/spotify");

router.get("/top/:type", ensureAuthenticated, async (req, res) => {
  const spotifyApi = await setSpotifyApi(req.headers);
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
