const {
  topicData, articleData, userData, commentData,
} = require('../data');
const { dateParser, createRef, formatComments } = require('../../utils/utils');

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
    .then((articleRows) => {
      const articleRef = createRef(articleRows, 'title', 'article_id');
      const formattedComments = formatComments(commentData, articleRef);
      const insertedComments = knex('comments')
        .insert(dateParser(formattedComments))
        .returning('*');
      return Promise.all([articleRows, insertedComments]);
    });
};
