const apiRouter = require('express').Router();
const topicsRouter = require('./topics_router');
const articlesRouter = require('./articles_router');
const commentsRouter = require('./comments_router');
const usersRouter = require('./users_router');
const sendApiInfo = require('../controllers/api');
const { handle405 } = require('../errors/index');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.get('/', sendApiInfo);
apiRouter.all('/', handle405);

module.exports = apiRouter;
