exports.up = function (knex) {
  return knex.schema.createTable("eventTypeRoom", function (t) {
    t.increments();
    t.integer("roomId").references("id").inTable("room").notNullable();
    t.integer("eventTypeId")
      .references("id")
      .inTable("eventType")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("eventTypeRoom");
};
