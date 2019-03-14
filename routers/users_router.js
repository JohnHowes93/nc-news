const usersRouter = require('express').Router();
const getUsersController = require('../controllers/users');

usersRouter.route('/').get(getUsersController);

module.exports = usersRouter;
