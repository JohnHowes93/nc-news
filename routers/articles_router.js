const articlesRouter = require('express').Router();
const {
  getArticlesController,
  postArticleController,
  getArticleByIdController,
  patchArticleController,
  deleteArticleByIdController,
  getCommentsByArticleIdController,
  postCommentByArticleIdController,
} = require('../controllers/articles');

const { handle405 } = require('../errors/index');

articlesRouter
  .route('/')
  .get(getArticlesController)
  .post(postArticleController)
  .all(handle405);

articlesRouter
  .route('/:article_id')
  .get(getArticleByIdController)
  .patch(patchArticleController)
  .delete(deleteArticleByIdController)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleIdController)
  .post(postCommentByArticleIdController)
  .all(handle405);

module.exports = articlesRouter;
