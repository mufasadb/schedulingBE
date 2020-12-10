exports.up = function (knex) {
  return knex.schema.createTable("eventTypeUser", function (t) {
    t.increments();
    t.integer("userId").references("id").inTable("user").notNullable();
    t.integer("eventTypeId")
      .references("id")
      .inTable("eventType")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("eventTypeUser");
};
