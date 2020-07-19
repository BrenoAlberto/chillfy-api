const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");
const { passport } = require("./services/spotify");
require("dotenv").config();

const port = process.env.PORT || 4001;
// const DB_HOST = process.env.DB_HOST;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(
  session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// db.connect(DB_HOST);

app.use(helmet());
app.use(cors());

app.get("/", function (req, res) {
  res.send({ user: req.user });
});

const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
const playerRoutes = require("./routes/player");

app.use("/api", authRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/stats", statsRoutes);

app.listen({ port }, () =>
  console.log(`Server running at http://localhost:${port}`)
);
