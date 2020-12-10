exports.up = function (knex) {
  return knex.schema.createTable("booking", (t) => {
    t.increments();
    t.integer("eventTypeId");
    t.string("date");
    t.integer("eventId").references("id").inTable("event").notNullable();
    t.integer("userId").references("id").inTable("user");
    t.integer("roomId").references("id").inTable("room");
    t.integer("bookTime");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("booking");
};
