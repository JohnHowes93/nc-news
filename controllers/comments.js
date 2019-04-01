const {
  getCommentByCommentIdModel,
  patchCommentModel,
  deleteCommentByIdModel,
} = require('../models/comments');

const patchCommentController = (req, res, next) => {
  getCommentByCommentIdModel(req.params.comment_id)
    .then((retrivedComment) => {
      if (retrivedComment.length === 0) {
        res.status(404).send({ msg: 'Not Found' });
      } else if (req.body.inc_votes === undefined) {
        return retrivedComment;
      } else if (typeof req.body.inc_votes !== 'number') {
        res.status(400).send({ msg: 'Vote Not Valid Number' });
      } else {
        return patchCommentModel(req.params.comment_id, req.body.inc_votes);
      }
    })
    .then(([patchedComment]) => res.status(200).send({ patchedComment }))
    .catch(next);
};

const deleteCommentByIdController = (req, res, next) => {
  getCommentByCommentIdModel(req.params.comment_id)
    .then((retrivedComment) => {
      if (retrivedComment.length === 0) {
        res.status(404).send({ msg: 'Not Found' });
      } else {
        deleteCommentByIdModel(req.params.comment_id)
          .then(() => res.sendStatus(204))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = { patchCommentController, deleteCommentByIdController };
