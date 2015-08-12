fs = require('fs')
path = require('path')
Sequelize = require('sequelize')
config = require('../../config/config')
db = {}

sequelize = new Sequelize config.db<% if (options.database == 'sqlite') { %>,
  storage: config.storage<% } %>

fs.readdirSync(__dirname)
  .filter (file) ->
    file.indexOf('.') != 0 and file != 'index.coffee'
  .forEach (file) ->
    model = sequelize.import path.join(__dirname, file)
    db[model.name] = model

Object.keys(db).forEach (modelName) ->
  if 'associate' of db[modelName]
    db[modelName].associate db

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
