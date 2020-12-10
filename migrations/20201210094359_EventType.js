exports.up = function (knex) {
  return knex.schema.createTable("eventType", (t) => {
    t.increments();
    t.integer("durationCount");
    t.text("name");
    t.text("description");
    t.boolean("isOnline");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("eventType");
};
