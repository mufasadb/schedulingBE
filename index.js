const express = require("express");
const bodyParser = require("body-parser");
const port = 3002;
const users = require("./api/user");
const rooms = require("./api/room");
const eventTypes = require("./api/eventType");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ info: "this is a node app with express and PG" });
});

app.use("/api/v1/users", users);
app.use("/api/v1/rooms", rooms);
app.use("/api/v1/eventTypes", eventTypes);

app.listen(port, () => {
  console.log(`the app is now running on port ${port}`);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get(`env`) === `development` ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get(`env`) === `development` ? err : {},
  });
});

// module.exports = app;
