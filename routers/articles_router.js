const articlesRouter = require('express').Router();
const { getArticlesController } = require('../controllers/articles');

articlesRouter.get('/', getArticlesController);

module.exports = articlesRouter;
