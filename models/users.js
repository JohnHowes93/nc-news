const connection = require('../db/connection');

const getUsersModel = () => connection.select('username', 'avatar_url', 'name').from('users');

module.exports = getUsersModel;
