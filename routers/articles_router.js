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

articlesRouter
  .route('/')
  .get(getArticlesController)
  .post(postArticleController)
  .patch(patchArticleController);

articlesRouter
  .route('/:article_id')
  .get(getArticleByIdController)
  .patch(patchArticleController)
  .delete(deleteArticleByIdController);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleIdController)
  .post(postCommentByArticleIdController);
module.exports = articlesRouter;
