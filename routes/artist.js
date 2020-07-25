const router = require("express").Router();
const { ensureAuthenticated, setSpotifyApi } = require("../services/spotify");
const artistService = require("../services/artist");
const albumService = require("../services/album");
const trackService = require("../services/track");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const spotifyApi = await setSpotifyApi(req.headers);
  const id = req.params.id;

  const artist = await artistService.insertArtist(spotifyApi, id);

  if (artist) {
    const albumsIds = await albumService.insertAlbums(spotifyApi, id);

    for (let i = 0; i < albumsIds.length; i++) {
      const albumId = albumsIds[i];

      await trackService.insertTracks(spotifyApi, albumId);
    }
  }

  return res.status(200).json(artist);
});

module.exports = router;
