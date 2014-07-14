fs = require('fs')
path = require('path')
Sequelize = require('sequelize')
lodash = require('lodash')
config = require('../../config/config')

sequelize = new Sequelize config.db

fs.readdirSync(__dirname)
  .filter (file) ->
    (file.indexOf('.') !== 0) && (file !== 'index.js');
  .forEach (file) ->
    model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;

Object.keys(db).forEach (modelName) ->
  if 'associate' in db[modelName]
    db[modelName].associate(db)

module.exports = lodash.extend(
  sequelize: sequelize,
  Sequelize: Sequelize
, db)
