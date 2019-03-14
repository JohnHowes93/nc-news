const articlesRouter = require('express').Router();
const {
  getArticlesController,
  postArticleController,
  getArticleByIdController,
  patchArticleController,
  deleteArticleByIdController,
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

module.exports = articlesRouter;
