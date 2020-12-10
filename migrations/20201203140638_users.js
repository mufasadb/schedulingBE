exports.up = function (knex) {
  return knex.schema.createTable("user", (t) => {
    t.increments();
    t.text("name");
    t.text("email");
    t.text("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
