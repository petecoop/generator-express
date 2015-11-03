var config = require('./config');

var thinky = require('thinky')(config.db);

module.exports = thinky;
