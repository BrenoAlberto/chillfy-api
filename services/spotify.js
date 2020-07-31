const SpotifyWebApi = require("spotify-web-api-node");
const { sleep } = require("../utils/util");
const moment = require("moment");
require("dotenv").config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_CALLBACK_URI = process.env.SPOTIFY_CALLBACK_URI;

function ensureAuthenticated(req, res, next) {
  if (
    req.headers.access_token &&
    req.headers.refresh_token &&
    req.headers.refresh_at
  ) {
    return next();
  }
  res.redirect("/api/auth");
}

//TODO is this the best way ?
async function setSpotifyApi({ access_token, refresh_token, refresh_at }) {
  const timeToRefresh = moment(moment.now()).isSameOrAfter(
    moment(new Date(refresh_at))
  );

  const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: SPOTIFY_CALLBACK_URI,
  });
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(refresh_token);

  spotifyApi.sleep = sleep;

  if (timeToRefresh)
    spotifyApi.setAccessToken(
      (await spotifyApi.refreshAccessToken()).body.access_token
    );

  return spotifyApi;
}

module.exports = {
  ensureAuthenticated,
  setSpotifyApi,
};
