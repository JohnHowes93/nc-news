const apiInfo = require('../apiRouteData.json');

const sendApiInfo = (req, res, next) => res.status(200).send(apiInfo);

module.exports = sendApiInfo;
