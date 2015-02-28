var config = require('../../config/config'),
  glob = require('glob'),
  thinky = require('../../config/thinky');

var models = {
  r: thinky.r
};
var files = glob.sync(config.root + '/app/models/!(index)*.js');
files.forEach(function (file) {
  var model = require(file);
  models[model.getTableName()] = model;
});

module.exports = models;
