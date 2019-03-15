const commentsRouter = require('express').Router();
const {
  patchCommentController,
  deleteCommentByIdController,
} = require('../controllers/comments');
const { handle405 } = require('../errors/index');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentController)
  .delete(deleteCommentByIdController);

commentsRouter.all('/', handle405);

module.exports = commentsRouter;
