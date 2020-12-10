exports.up = function (knex) {
  return knex.schema.createTable("room", (t) => {
    t.increments();
    t.text("address");
    t.text("room");
    t.text("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("room");
};
