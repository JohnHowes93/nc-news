const topicsRouter = require('express').Router();
const {
  getTopicsController,
  postTopicController,
} = require('../controllers/topics');
const { handle405 } = require('../errors/index');

topicsRouter
  .route('/')
  .get(getTopicsController)
  .post(postTopicController)
  .all(handle405);

module.exports = topicsRouter;
