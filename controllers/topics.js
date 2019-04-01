const { getTopicsModel, postTopicModel } = require('../models/topics');

const getTopicsController = (req, res, next) => getTopicsModel()
  .then((fetchedTopics) => {
    res.status(200).send({ fetchedTopics });
  })
  .catch(next);
const postTopicController = (req, res, next) => {
  console.log(req.body);
  return postTopicModel(req, res)
    .then(([postedTopic]) => {
      res.status(201).send({ postedTopic });
    })
    .catch(next);
};
module.exports = { getTopicsController, postTopicController };
