config = require('../../config/config')
glob = require('glob')
thinky = require('../../config/thinky')

models =
  r: thinky.r

files = glob.sync config.root + '/app/models/!(index)*.js'
files.forEach (file) ->
  model = require file
  models[model.getTableName()] = model;

module.exports = models;
