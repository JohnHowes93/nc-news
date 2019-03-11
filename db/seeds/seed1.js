const {
  topicData, articleData, userData, commentData,
} = require('../data');
const { dateParser } = require('../../utils/utils');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics')
      .insert(topicData)
      .returning('*'))
    .then(() => knex('users')
      .insert(userData)
      .returning('*'))
    .then(() => knex('articles')
      .insert(dateParser(articleData))
      .returning('*'))
    .then(() => knex('comments')
      .insert(dateParser(commentData))
      .returning('*'));
};
