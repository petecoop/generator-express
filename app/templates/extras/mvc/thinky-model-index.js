const config = require('../../config/config');
const glob = require('glob');
const thinky = require('../../config/thinky');

const models = {
  r: thinky.r
};
const files = glob.sync(config.root + '/app/models/!(index)*.js');
files.forEach((file) => {
  const model = require(file);
  models[model.getTableName()] = model;
});

module.exports = models;
