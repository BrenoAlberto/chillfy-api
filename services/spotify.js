const SpotifyWebApi = require("spotify-web-api-node");
const SpotifyStrategy = require("passport-spotify").Strategy;
const passport = require("passport");
require("dotenv").config();

const port = process.env.PORT || 4001;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const spotifyApi = new SpotifyWebApi();

passport.use(
  new SpotifyStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/api/spotify/callback`,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      spotifyApi.setAccessToken(accessToken);

      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/spotify/auth");
}

module.exports = {
  passport,
  spotifyApi,
  ensureAuthenticated,
};
