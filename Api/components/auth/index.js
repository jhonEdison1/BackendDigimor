const store = require('../../../store/postgreSQL');

const controller = require('./controller');

module.exports = controller(store);