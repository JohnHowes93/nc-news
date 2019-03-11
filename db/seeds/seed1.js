const { topicData, articleData, userData, commentData } = require("../data");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex("topics")
        .insert(topicData)
        .returning("*")
    )
    .then(() =>
      knex("users")
        .insert(userData)
        .returning("*")
    )
    .then(() =>
      knex("articles")
        .insert(articleData)
        .returning("*")
    )
    .then(() =>
      knex("comments")
        .insert(commentData)
        .returning("*")
    );
};
