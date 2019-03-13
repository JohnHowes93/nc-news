const connection = require('../db/connection');

const getTopicsModel = () => connection.select('*').from('topics');
const postTopicModel = (req, res) => connection
  .insert(req.body)
  .into('topics')
  .returning('*');
module.exports = { getTopicsModel, postTopicModel };
