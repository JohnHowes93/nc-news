const {
  patchCommentModel,
  deleteCommentByIdModel,
} = require('../models/comments');

const patchCommentController = (req, res, next) => {
  if (req.body.inc_votes === undefined) {
    res.status(400).send({ msg: 'Vote Not Found' });
  } else if (typeof req.body.inc_votes !== 'number') {
    res.status(400).send({ msg: 'Vote Not Valid Number' });
  } else {
    patchCommentModel(req.params.comment_id, req.body.inc_votes)
      .then(([patchedComment]) => res.status(200).send({ patchedComment }))
      .catch(next);
  }
};

const deleteCommentByIdController = (req, res, next) => {
  deleteCommentByIdModel(req.params.comment_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = { patchCommentController, deleteCommentByIdController };
