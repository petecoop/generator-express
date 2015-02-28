config = require('./config')

thinky = require('thinky')(config.db)

module.exports = thinky
