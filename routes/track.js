const router = require("express").Router();
const { ensureAuthenticated, setSpotifyApi } = require("../services/spotify");
const trackService = require("../services/track");
const trackRepository = require("../repository/track");
const queueService = require("../services/queue");
router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const spotifyApi = await setSpotifyApi(req.headers);
    const id = req.params.id;

    const track = await trackService.getSertTrack(spotifyApi, id);

    if (track && !track.ws_crawled && track.artist.length) {
      await queueService.insertGetSamples(
        id,
        track.artists[0].name,
        track.name,
        req.headers
      );
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
