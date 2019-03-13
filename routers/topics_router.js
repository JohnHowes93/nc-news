const topicsRouter = require('express').Router();
const {
  getTopicsController,
  postTopicController,
} = require('../controllers/topics');

topicsRouter
  .route('/')
  .get(getTopicsController)
  .post(postTopicController);

module.exports = topicsRouter;
