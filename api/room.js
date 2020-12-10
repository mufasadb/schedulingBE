const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

const objectType = "room";

function isValidID(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error("Invalid ID"));
  }
}

function validUser(user) {
  const hasRoom = typeof user.room == "string" && user.room.trim() != "";

  return hasRoom;
}

router.get("/", (req, res) => {
  queries.getAllGeneric(objectType).then((users) => {
    res.json(users);
  });
});

router.get("/:id", isValidID, (req, res, next) => {
  queries.getOneGeneric(objectType, req.params.id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      // res.status(404)
      // next (new Error ('Not Found'))
      next();
    }
  });
});

router.post("/", (req, res, next) => {
  if (validRoom(req.body)) {
    queries.createGeneric(objectType, req.body).then((user) => {
      res.json(user[0]);
    });
  } else {
    next(new Error("invald room"));
  }
});

router.put("/:id", isValidID, (req, res, next) => {
  if (validRoom(req.body)) {
    queries.updateGeneric(objectType, req.params.id, req.body).then((user) => {
      res.json(user[0]);
    });
  } else next(new Error("invalid room"));
});

router.delete("/:id", isValidID, (req, res, next) => {
  queries.deleteGeneric(objectType, req.params.id).then(() => {
    res.json({
      deleted: true,
    });
  });
});

module.exports = router;
