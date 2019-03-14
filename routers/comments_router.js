const commentsRouter = require('express').Router();
const {
  patchCommentController,
  deleteCommentByIdController,
} = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentController)
  .delete(deleteCommentByIdController);

module.exports = commentsRouter;
