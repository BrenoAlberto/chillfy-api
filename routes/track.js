const router = require("express").Router();
const { ensureAuthenticated, setSpotifyApi } = require("../services/spotify");
const trackService = require("../services/track");
const trackRepository = require("../repository/track");
const queueRepository = require("../repository/queue");
router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const spotifyApi = await setSpotifyApi(req.headers);
    const id = req.params.id;

    let track = await trackRepository.getTrack({ id });

    if (!track) track = await trackService.insertTrack(spotifyApi, id);

    if (!track.ws_crawled) {
      await queueRepository.insertItem({
        type: "getSamples",
        data: {
          id,
          artist: track.artists[0].name,
          track: track.name,
          spotifyCredentials: {
            access_token: req.headers.access_token,
            refresh_token: req.headers.refresh_token,
            refresh_at: req.headers.refresh_at,
          },
        },
        date: Date.now(),
      });
    }

    return res.status(200).json(track);
  } catch (err) {
    return res.status(err.httpStatus).json(err.message);
  }
});

router.put("/:id/sample/:sampleId", ensureAuthenticated, async (req, res) => {
  try {
    const spotifyApi = await setSpotifyApi(req.headers);
    const id = req.params.id;
    const sampleId = req.params.sampleId;
    const { type, sample_ms } = req.body;

    const track = await trackService.insertSample(
      spotifyApi,
      id,
      sampleId,
      type
    );

    return res.status(200).json(track);
  } catch (err) {
    return res.status(err.httpStatus).json(err.message);
  }
});

module.exports = router;
