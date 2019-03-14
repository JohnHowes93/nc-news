const connection = require('../db/connection');

const getUsersModel = () => connection.select('username', 'avatar_url', 'name').from('users');

const postUserModel = (username, avatar_url, name) => connection('users')
  .insert({
    username,
    avatar_url,
    name,
  })
  .returning('*');

module.exports = { getUsersModel, postUserModel };
