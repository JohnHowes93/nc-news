const { getTopicsModel, postTopicModel } = require('../models/topics');

const getTopicsController = (req, res, next) => getTopicsModel().then((fetchedTopics) => {
  res.status(200).send({ fetchedTopics });
});
const postTopicController = (req, res) => postTopicModel(req, res).then(([postedTopic]) => {
  res.status(201).send({ postedTopic });
});
module.exports = { getTopicsController, postTopicController };
