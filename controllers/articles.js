const {
  getArticlesModel,
  postArticleModel,
  getArticleByIdModel,
  patchArticleModel,
  deleteArticleByIdModel,
  getCommentsByArticleIdModel,
  postCommentByArticleIdModel,
} = require('../models/articles');

const getArticlesController = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit,
  } = req.query;
  return getArticlesModel(author, topic, sort_by, order, limit)
    .then((fetchedArticles) => {
      if ([fetchedArticles]) res.status(200).send({ fetchedArticles });
      else Promise.reject({ status: 404, msg: 'Article Not Found' });
    })
    .catch(next);
};

const postArticleController = (req, res, next) => {
  const {
    title, body, topic, author,
  } = req.body;
  return postArticleModel(title, body, topic, author)
    .then(([postedArticle]) => {
      res.status(201).send({ postedArticle });
    })
    .catch(next);
};

const getArticleByIdController = (req, res, next) => getArticleByIdModel(req.params.article_id)
  .then(([fetchedArticleById]) => {
    if (fetchedArticleById === undefined) {
      res.status(400).send({ msg: 'Article Not Found' });
    } else res.status(200).send({ fetchedArticleById });
  })
  .catch(next);

const patchArticleController = (req, res, next) => {
  if (req.body.inc_votes === undefined) {
    res.status(400).send({ msg: 'Vote Not Found' });
  } else if (typeof req.body.inc_votes !== 'number') {
    res.status(400).send({ msg: 'Vote Not Valid Number' });
  } else {
    patchArticleModel(req.params.article_id, req.body.inc_votes)
      .then(([patchedArticle]) => res.status(200).send({ patchedArticle }))
      .catch(next);
  }
};

const deleteArticleByIdController = (req, res, next) => {
  // Promise.all([getArticleByIdModel(req.params.article_id)]).then(
  //   returnedArticle => {
  //     if (returnedArticle.length === 0) {
  //       res
  //         .status(404)
  //         .send({ msg: 'Cannot Delete Article That Does Not Exists' });
  //     } else deleteArticleByIdModel(req.params.article_id);
  //     res.sendStatus(204);
  //   })

  deleteArticleByIdModel(req.params.article_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const getCommentsByArticleIdController = (req, res, next) => {
  Promise.all([
    getArticleByIdModel(req.params.article_id),
    getCommentsByArticleIdModel(
      req.params.article_id,
      req.query.sort_by,
      req.query.order,
    ),
  ]).then((returnedArticleAndComments) => {
    if (returnedArticleAndComments[0].length === 0) {
      res.status(404).send({ msg: 'Article Not Found' });
    } else if (returnedArticleAndComments[1].length === 0) {
      res.status(404).send('No Comments Found');
    } else {
      res
        .status(200)
        .send({ retrievedComments: returnedArticleAndComments[1] });
    }
  });

  // getCommentsByArticleIdModel()
  //   .then(retrievedComments => {
  //     if (retrievedComments.length === 0) {
  //       res.status(404).send('No Comments Found');
  //     } else {
  //       res.status(200).send({ retrievedComments });
  //     }
  //   })
  //   .catch(next);
};

const postCommentByArticleIdController = (req, res, next) => {
  postCommentByArticleIdModel(
    req.params.article_id,
    req.body.username,
    req.body.body,
  )
    .then(([postedComment]) => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

module.exports = {
  getArticlesController,
  postArticleController,
  getArticleByIdController,
  patchArticleController,
  deleteArticleByIdController,
  getCommentsByArticleIdController,
  postCommentByArticleIdController,
};
