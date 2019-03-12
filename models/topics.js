const connection = require('../db/connection');

const fetchTopics = () => {
  console.log('reached model');
  return connection.select('*').from('topics');
};

module.exports = fetchTopics;
