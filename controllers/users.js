const getUsersModel = require('../models/users');

const getUsersController = (req, res, next) => getUsersModel()
  .then((fetchedUsers) => {
    if (fetchedUsers) res.status(200).send({ fetchedUsers });
    else Promise.reject({ status: 404, msg: 'Users Not Found' });
  })
  .catch(next);

module.exports = getUsersController;
