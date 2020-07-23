const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const port = process.env.PORT || 4001;
const DB_HOST = process.env.DB_HOST;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

db.connect(DB_HOST);

require("./models");

const { passport } = require("./services/spotify");

app.use(
  session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
app.use(cors());

app.get("/", function (req, res) {
  res.send({ user: req.user });
});

const baseApiUrl = "/api";
const routes = require("./routes");

app.use(baseApiUrl, routes.auth);
app.use(`${baseApiUrl}/artist`, routes.artist);
app.use(`${baseApiUrl}/player`, routes.player);
app.use(`${baseApiUrl}/track`, routes.track);
app.use(`${baseApiUrl}/search`, routes.search);
app.use(`${baseApiUrl}/stats`, routes.stats);

app.listen({ port }, () =>
  console.log(`Server running at http://localhost:${port}`)
);
