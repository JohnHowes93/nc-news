const connection = require('../db/connection');

const getArticlesModel = (
  author,
  topic,
  sort_by = 'articles.created_at',
  order = 'desc',
  limit = 10,
) => connection
  .select(
    'articles.author',
    'articles.title',
    'articles.article_id',
    'articles.topic',
    'articles.created_at',
    'articles.votes',
  )
  .from('articles')
  .modify((query) => {
    if (author) query.where('articles.author', author);
  })
  .modify((query) => {
    if (topic) query.where('articles.topic', topic);
  })
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .count({ comment_count: 'comments.article_id' })
  .modify((query) => {
    if (author) {
      query.where('articles.author', author);
    }
  })
  .groupBy('comments.article_id', 'articles.article_id')
  .orderBy(sort_by, order)
  .limit(limit);
module.exports = { getArticlesModel };
