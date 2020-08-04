const router = require("express").Router();
const { ensureAuthenticated, setSpotifyApi } = require("../services/spotify");
const artistService = require("../services/artist");
const albumService = require("../services/album");
const trackService = require("../services/track");

router.get("/:id", ensureAuthenticated, async (req, res) => {
  const spotifyArtistId = req.params.id;
  try {
    const spotifyApi = await setSpotifyApi(req.headers);
    const artist = await artistService.getsertArtist(
      spotifyApi,
      spotifyArtistId
    );

    if (artist) {
      const albums = await albumService.getsertArtistAlbums(
        spotifyApi,
        spotifyArtistId
      );
      for (let i = 0; i < albums.length; i++) {
        const spotifyAlbumId = albums[i].spotifyAlbumId;

        await trackService.getsertAlbumTracks(spotifyApi, spotifyAlbumId);
      }
    }

    return res.status(200).json(artist);
  } catch (err) {
    return res.status(err.httpStatus).json(err.message);
  }
});

module.exports = router;
