const router = require("express").Router();
const { spotifyApi, ensureAuthenticated } = require("../services/spotify");

// TODO player devices
// TODO player currently playing
// TODO player queue
// TODO player seek

router.get("/", ensureAuthenticated, async (req, res) => {
  const player = (await spotifyApi.getMyCurrentPlaybackState()).body;

  return res.status(200).json(player);
});

router.get("/recently-played", ensureAuthenticated, async (req, res) => {
  try {
    const recentlyPlayedTracks = (await spotifyApi.getMyRecentlyPlayedTracks())
      .body.items;

    const result = [];
    recentlyPlayedTracks.forEach((element) => {
      result.push(element.track.name);
    });
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

router.post("/volume", ensureAuthenticated, async (req, res) => {
  const { volumePerecent } = req.body;
  await spotifyApi.setVolume(volumePerecent);

  return res.status(200);
});

router.post("/skip/:type", ensureAuthenticated, async (req, res) => {
  const type = req.params.type.toLowerCase();

  if (type === "next") await spotifyApi.skipToNext();
  else if (type === "previous") await spotifyApi.skipToPrevious();

  return res.status(200);
});

router.put("/shuffle", ensureAuthenticated, async (req, res) => {
  const { state } = req.body;
  await spotifyApi.setShuffle({ state });

  return res.status(200);
});

router.put("/repeat", ensureAuthenticated, async (req, res) => {
  const { state } = req.body; // context, track, off
  await spotifyApi.setRepeat({ state });

  return res.status(200);
});

router.put("/play", ensureAuthenticated, async (req, res) => {
  await spotifyApi.play();

  return res.status(200);
});

router.put("/pause", ensureAuthenticated, async (req, res) => {
  await spotifyApi.pause();

  return res.status(200);
});

module.exports = router;
