const config = require('./config');
const thinky = require('thinky')(config.db);

module.exports = thinky;
