const apiRouter = require('express').Router();
const topicsRouter = require('./topics_router');
const articlesRouter = require('./articles_router');
const commentsRouter = require('./comments_router');
const usersRouter = require('./users_router');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
