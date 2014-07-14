express  = require 'express'
fs       = require 'fs'
config   = require './config/config'<% if(options.database == 'mongodb'){ %>
mongoose = require 'mongoose'<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
db = require './app/models'<% } %>
<% if(options.database == 'mongodb'){ %>
mongoose.connect config.db
db = mongoose.connection
db.on 'error', ->
  throw new Error('unable to connect to database at ' + config.db)

modelsPath = __dirname + '/app/models'
fs.readdirSync(modelsPath).forEach (file) ->
  if  file.indexOf('.coffee') >= 0
    require modelsPath + '/' + file
<% } %>
app = express()

controllersPath = __dirname + '/app/controllers'
fs.readdirSync(controllersPath).forEach (file) ->
  if  file.indexOf('.coffee') >= 0
    require(controllersPath + '/' + file)(app)

require('./config/express')(app, config)
<% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
db.sequelize
  .sync()
  .complete (err) ->
    if err
      throw err[0]
    else
      app.listen(config.port);
<% } else { %>
app.listen config.port
<% } %>