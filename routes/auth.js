const router = require("express").Router();
require("dotenv").config();
const request = require("request");
const querystring = require("querystring");
const moment = require("moment");

const redirect_uri =
  process.env.SPOTIFY_CALLBACK_URI || "http://localhost:4001/callback";

router.get("/login", function (req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope:
          "user-read-email user-read-private user-top-read user-read-recently-played user-read-currently-playing user-read-playback-state user-modify-playback-state streaming",
        redirect_uri,
      })
  );
});

router.get("/callback", function (req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    const { access_token, refresh_token, expires_in } = body;
    const uri = process.env.FRONTEND_URI || "http://localhost:3000";

    const refresh_at = moment(moment.now())
      .add(expires_in, "seconds")
      .toString();

    res.redirect(
      `${uri}?access_token=${access_token}&refresh_token=${refresh_token}&refresh_at=${refresh_at}`
    );
  });
});

module.exports = router;
