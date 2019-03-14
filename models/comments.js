const connection = require('../db/connection');

const patchCommentModel = (comment_id, newVote) => connection('comments')
  .where('comment_id', comment_id)
  .increment('votes', newVote || 0)
  .returning('*');

const deleteCommentByIdModel = comment_id => connection('comments')
  .where('comment_id', comment_id)
  .del();

module.exports = { patchCommentModel, deleteCommentByIdModel };
