const router = require("express").Router();
const { ensureAuthenticated, setSpotifyApi } = require("../services/spotify");
const trackService = require("../services/track");
const trackRepository = require("../repository/track");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const spotifyApi = await setSpotifyApi(req.headers);
  const id = req.params.id;

  let track = await trackRepository.getTrack({ id });

  if (!track) track = await trackService.insertTrack(spotifyApi, id);

  return res.status(200).json(track);
});

router.put("/:id/sample/:sampleId", ensureAuthenticated, async (req, res) => {
  const spotifyApi = await setSpotifyApi(req.headers);
  const id = req.params.id;
  const sampleId = req.params.sampleId;
  const { type, sample_ms } = req.body;

  let track = await trackRepository.getTrack({ id });
  let sample = await trackRepository.getTrack({ id: sampleId });

  if (!track) track = await trackService.insertTrack(spotifyApi, id);
  if (!sample) sample = await trackService.insertTrack(spotifyApi, sampleId);

  const newSample = { id: sample._id, sample_ms, type };

  if (track.samples) track.samples.push(newSample);
  else track.samples = [newSample];

  track = await trackRepository.updateTrack(id, {
    samples: track.samples,
  });

  return res.status(200).json(track);
});

module.exports = router;
