exports.up = function (knex) {
  return knex.schema.createTable("event", (t) => {
    t.increments();
    t.integer("eventTypeId")
      .references("id")
      .inTable("eventType")
      .notNullable();
    t.integer("userId").references("id").inTable("user").notNullable();
    t.integer("roomId").references("id").inTable("room").notNullable();
    t.string("attendeeName");
    t.string("attendeeDetails");
    t.string("attendeeEmail");
    t.string("meetingURL");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("event");
};
