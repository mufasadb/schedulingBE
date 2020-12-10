const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

const objectType = "eventType";

function isValidID(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error("Invalid ID"));
  }
}

function validEventType(eventType) {
  return true;
}

router.get("/:id/:relation", (req, res) => {
  let result = "";
  if (req.params.relation == "user") {
    queries.getUsersForEvent(req.params.id).then((users) => {
      res.json(users);
    });
  } else if (req.params.relation == "room") {
    queries.getRoomsForEvent(req.params.id).then((rooms) => {
      res.json(rooms);
    });
  } else next(new Error("relation type is not valid"));
});

router.post("/assign", (req, res) => {
  if (req.body.relation == "user") {
    console.log("weve got a user type");
    queries
      .assignUsertoEvent(req.body.userId, req.body.eventTypeId)
      .then((eventTypeUser) => {
        res.json(eventTypeUser);
      });
  } else if (req.body.relation == "room") {
    queries
      .assignRoomToEvent(req.body.roomId, req.body.eventTypeId)
      .then((eventTypeRoom) => {
        res.json(eventTypeRoom);
      });
  } else next(new Error("relation type is not valid"));
});

router.delete("/unassign", (req, res) => {
  if (req.body.relation == "user") {
    queries
      .unassignUserFromEvent(req.body.userId, req.body.eventTypeId)
      .then((eventTypeUser) => {
        res.json(eventTypeUser);
      });
  } else if (req.body.relation == "room") {
    queries
      .unassignRoomFromEvent(req.body.roomId, req.body.eventTypeId)
      .then((eventTypeRoom) => {
        res.json(eventTypeRoom);
      });
  } else next(new Error("relation type is not valid"));
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
  if (validEventType(req.body)) {
    queries.createGeneric(objectType, req.body).then((user) => {
      res.json(user[0]);
    });
  } else {
    next(new Error("invald room"));
  }
});

router.put("/:id", isValidID, (req, res, next) => {
  if (validEventType(req.body)) {
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
