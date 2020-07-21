const router = require("express").Router();
const { spotifyApi, ensureAuthenticated } = require("../services/spotify");
const artistService = require("../services/artist");
const albumService = require("../services/album");
const trackService = require("../services/track");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const id = req.params.id;

  const artist = await artistService.insertArtist(id);
  const albums = await albumService.insertAlbums(id);

  for (let i = 0; i < albums.length; i++) {
    const album = albums[i];

    const track = await trackService.insertTracks(album);
  }

  return res.status(200);
});

module.exports = router;
