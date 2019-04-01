// ./db/connection.js
const knex = require('knex');
const dbConfig = require('../knexfile');
const ENV = process.env.NODE_ENV || 'development';
const config =
  ENV === 'production'
    ? { client: 'pg', connection: process.env.DATABASE_URL }
    : require('../knexfile')[ENV];

const connection = knex(dbConfig);
module.exports = require('knex')(config);
