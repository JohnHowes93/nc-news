const { getArticlesModel } = require('../models/articles');

const getArticlesController = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit,
  } = req.query;

  // console.log('get request for Articles recieved at controller');
  return getArticlesModel(author, topic, sort_by, order, limit).then(
    (fetchedArticles) => {
      res.status(200).send({ fetchedArticles });
    },
  );
};

module.exports = { getArticlesController };
