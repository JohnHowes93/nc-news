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

const postArticleModel = (title, body, topic, author) => connection('articles')
  .insert({
    title,
    body,
    topic,
    author,
  })
  .returning('*');

const getArticleByIdModel = article_id => connection
  .select(
    'articles.author',
    'articles.title',
    'articles.article_id',
    'articles.topic',
    'articles.created_at',
    'articles.votes',
  )
  .from('articles')
  .where('articles.article_id', article_id)
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .count({ comment_count: 'comments.article_id' })
  .groupBy('comments.article_id', 'articles.article_id');

const patchArticleModel = (article_id, newVote) => connection('articles')
  .where('articles.article_id', article_id)
  .increment('votes', newVote || 0)
  .returning('*');

const deleteArticleByIdModel = article_id => connection('articles')
  .where('article_id', article_id)
  .del();

const getCommentsByArticleIdModel = (
  article_id,
  sort_by = 'created_at',
  order = 'desc',
  limit = 10,
) => connection
  .select('comment_id', 'votes', 'created_at', 'author', 'body')
  .from('comments')
  .where('article_id', article_id)
  .orderBy(sort_by, order)
  .limit(limit);

const postCommentByArticleIdModel = (article_id, username, body) => connection('comments')
  .insert({
    article_id,
    author: username,
    body,
  })
  .returning('*');

module.exports = {
  getArticlesModel,
  postArticleModel,
  getArticleByIdModel,
  patchArticleModel,
  deleteArticleByIdModel,
  getCommentsByArticleIdModel,
  postCommentByArticleIdModel,
};
