const router = require("express").Router();
const { ensureAuthenticated, setSpotifyApi } = require("../services/spotify");
const artistService = require("../services/artist");
const albumService = require("../services/album");
const trackService = require("../services/track");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const id = req.params.id;
  try {
    const spotifyApi = await setSpotifyApi(req.headers);
    const artist = await artistService.getsertArtist(spotifyApi, id);

    if (artist) {
      const albumsIds = await albumService.insertAlbums(spotifyApi, id);

      for (let i = 0; i < albumsIds.length; i++) {
        const albumId = albumsIds[i];

        await trackService.getsertAlbumTracks(spotifyApi, albumId);
      }
    }

    return res.status(200).json(artist);
  } catch (err) {
    return res.status(err.httpStatus).json(err.message);
  }
});

module.exports = router;
