const knex = require("./knex");

module.exports = {
  getAllGeneric(objectType) {
    return knex(objectType);
  },
  getOneGeneric(objectType, id) {
    console.log(id);
    return knex(objectType).where("id", id).first();
  },
  createGeneric(objectType, object) {
    return knex(objectType).insert(object, "*");
  },
  updateGeneric(objectType, id, user) {
    return knex(objectType).where("id", id).update(user, "*");
  },
  deleteGeneric(objectType, id) {
    return knex(objectType).where("id", id).del();
  },
  assignRoomToEvent(roomId, eventTypeId) {
    return knex("eventTypeRoom").insert(
      { eventTypeId: eventTypeId, roomId: roomId },
      "*"
    );
  },
  assignUsertoEvent(userId, eventTypeId) {
    return knex("eventTypeUser").insert(
      { eventTypeId: eventTypeId, userId: userId },
      "*"
    );
  },
  getRoomsForEvent(id) {
    return knex("eventTypeRoom").where("eventTypeId", id);
  },
  getUsersForEvent(id) {
    return knex("eventTypeUser").where("eventTypeId", id);
  },
  getEventTypesforUser(id) {
    return knex("eventTypeUser").where("userId", id);
  },
  unassignUserFromEvent(userId, eventTypeId) {
    return knex("eventTypeUser")
      .where("userId", userId)
      .where("eventTypeId", eventTypeId)
      .del();
  },
  unassignRoomFromEvent(roomId, eventTypeId) {
    return knex("eventTypeRoom")
      .where("roomId", roomId)
      .where("eventTypeId", eventTypeId)
      .del();
  },
};
