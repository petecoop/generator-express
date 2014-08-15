express  = require 'express'
config   = require './config/config'<% if(options.database == 'mongodb'){ %>
fs = require 'fs'
mongoose = require 'mongoose'<% } %><% if(options.database == 'mysql' || options.database == 'postgresql'){ %>
db = require './app/models'<% } %>
<% if(options.database == 'mongodb'){ %>
mongoose.connect config.db
db = mongoose.connection
db.on 'error', ->
  throw new Error('unable to connect to database at ' + config.db)

modelsPath = __dirname + '/app/models'
fs.readdirSync(modelsPath).forEach (file) ->
  if file.match(/\.coffee$/) >= 0
    require modelsPath + '/' + file
<% } %>
app = express()

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