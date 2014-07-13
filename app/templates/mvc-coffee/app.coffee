express  = require 'express'
mongoose = require 'mongoose'
fs       = require 'fs'
config   = require './config/config'

mongoose.connect config.db
db = mongoose.connection
db.on 'error', ->
  throw new Error('unable to connect to database at ' + config.db)

modelsPath = __dirname + '/app/models'
fs.readdirSync(modelsPath).forEach (file) ->
  if  file.indexOf('.coffee') >= 0
    require modelsPath + '/' + file

app = express()

require('./config/express')(app, config)

controllersPath = __dirname + '/app/controllers'
fs.readdirSync(controllersPath).forEach (file) ->
  if  file.indexOf('.coffee') >= 0
    require(controllersPath + '/' + file)(app)

app.listen config.port
