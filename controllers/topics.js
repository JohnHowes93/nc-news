const fetchTopics = require('../models/topics');

exports.getTopics = (req, res, next) => {
  console.log('reached controller');
  return fetchTopics().then((fetchedTopics) => {
    res.status(200).send({ fetchedTopics });
  });
};
