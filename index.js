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
require("./models/user");
require("./models/track");
require("./models/artist");
require("./models/album");

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

const authRoutes = require("./routes/auth");
const artistRoutes = require("./routes/artist");
const statsRoutes = require("./routes/stats");
const playerRoutes = require("./routes/player");

app.use("/api", authRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/stats", statsRoutes);

app.listen({ port }, () =>
  console.log(`Server running at http://localhost:${port}`)
);
