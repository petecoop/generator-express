express = require 'express'
fs = require 'fs'
path = require 'path'

favicon = require 'serve-favicon'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
compress = require 'compression'
methodOverride = require 'method-override'

module.exports = (app, config) ->
  app.set 'views', config.root + '/app/views'
  app.set 'view engine', '<%= options.viewEngine %>'

  # app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use logger 'dev'
  app.use bodyParser.json()
  app.use bodyParser.urlencoded(
    extended: true
  )
  app.use cookieParser()
  app.use compress()
  app.use express.static config.root + '/public'
  app.use methodOverride()

  controllersPath = path.join __dirname, '../app/controllers'
  fs.readdirSync(controllersPath).forEach (file) ->
    if file.indexOf('.coffee') >= 0
      require(controllersPath + '/' + file)(app)

  # catch 404 and forward to error handler
  app.use (req, res, next) ->
    err = new Error 'Not Found'
    err.status = 404
    next err

  # error handlers

  # development error handler
  # will print stacktrace
  if app.get('env') == 'development'
    app.use (err, req, res, next) ->
      res.status err.status || 500
      res.render 'error',
        message: err.message
        error: err
        title: 'error'

  # production error handler
  # no stacktraces leaked to user
  app.use (err, req, res, next) ->
    res.status err.status || 500
    res.render 'error',
      message: err.message
      error: {}
      title: 'error'
