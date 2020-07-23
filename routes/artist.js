const router = require("express").Router();
const { ensureAuthenticated } = require("../services/spotify");
const artistService = require("../services/artist");
const albumService = require("../services/album");
const trackService = require("../services/track");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const id = req.params.id;

  const artist = await artistService.insertArtist(id);

  if (artist) {
    const albumsIds = await albumService.insertAlbums(id);

    for (let i = 0; i < albumsIds.length; i++) {
      const albumId = albumsIds[i];

      await trackService.insertTracks(albumId);
    }
  }

  return res.status(200).json(artist);
});

module.exports = router;
