const {
  getArticlesModel,
  postArticleModel,
  getArticleByIdModel,
  patchArticleModel,
  deleteArticleByIdModel,
  getCommentsByArticleIdModel,
  postCommentByArticleIdModel,
} = require('../models/articles');

const { getUserByUsernameController } = require('../controllers/users');

const getArticlesController = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit, p,
  } = req.query;
  if (sort_by !== 'created_at' || 'votes' || 'comment_count') {
    ('created_at');
  }
  return getArticlesModel(author, topic, sort_by, order, limit, p)
    .then((articles) => {
      if (articles.length === 0) res.status(200).send([]);
      if (articles.length > 0) res.status(200).send({ articles });
      else return Promise.reject({ status: 404, msg: 'Article Not Found' });
    })
    .catch(next);
};

const postArticleController = (req, res, next) => {
  const {
    title, body, topic, author,
  } = req.body;
  return postArticleModel(title, body, topic, author)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

const getArticleByIdController = (req, res, next) => getArticleByIdModel(req.params.article_id)
  .then(([article]) => {
    if (article === undefined) {
      res.status(404).send({ msg: 'Article Not Found' });
    } else res.status(200).send({ article });
  })
  .catch(next);

const patchArticleController = (req, res, next) => getArticleByIdModel(req.params.article_id)
  .then((retrivedArticle) => {
    if (req.body.inc_votes === undefined) {
      res.status(200).send(retrivedArticle);
    } else if (typeof req.body.inc_votes !== 'number') {
      res.status(400).send({ msg: 'Vote Not Valid Number' });
    } else {
      return patchArticleModel(req.params.article_id, req.body.inc_votes)
        .then(([article]) => res.status(200).send({ article }))
        .catch(next);
    }
  })
  .catch(next);

const deleteArticleByIdController = (req, res, next) => deleteArticleByIdModel(req.params.article_id)
  .then((itemsDeleted) => {
    if (itemsDeleted === 1) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  })
  .catch(next);

const getCommentsByArticleIdController = (req, res, next) => {
  Promise.all([
    getArticleByIdModel(req.params.article_id),
    getCommentsByArticleIdModel(
      req.params.article_id,
      req.query.sort_by,
      req.query.order,
    ),
  ])
    .then((returnedArticleAndComments) => {
      if (returnedArticleAndComments[0].length === 0) {
        res.status(200).send({[]});
      } else if (returnedArticleAndComments[1].length === 0) {
        res.status(404).send('No Comments Found');
      } else {
        res.status(200).send({ comments: returnedArticleAndComments[1] });
      }
    })
    .catch(next);
};

const postCommentByArticleIdController = (req, res, next) => {
  if (req.body.username === undefined || req.body.body === undefined) {
    res.status(400).send({ msg: 'Bad Request' });
  }
  getUserByUsernameController(req, res, next).then((response) => {
    if (response.msg === 'Unprocessable Entity') {
      res.status(422).send({ msg: 'Unprocessable Entity' });
    } else {
      getArticleByIdModel(req.params.article_id).then(([article]) => {
        if (article === undefined) {
          res.status(404).send({ msg: 'Article Not Found' });
        } else {
          postCommentByArticleIdModel(
            req.params.article_id,
            req.body.username,
            req.body.body,
          )
            .then(([comment]) => {
              res.status(201).send({ comment });
            })
            .catch(next);
        }
      });
    }
  });
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
