express = require 'express'
glob = require 'glob'

favicon = require 'serve-favicon'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
compress = require 'compression'
methodOverride = require 'method-override'<% if(options.viewEngine == 'swig'){ %>
swig = require 'swig'<% } %><% if(options.viewEngine == 'handlebars'){ %>
exphbs  = require 'express-handlebars'<% } %><% if(options.viewEngine == 'nunjucks'){ %>
nunjucks = require 'nunjucks'<% } %>

module.exports = (app, config) ->
  env = process.env.NODE_ENV || 'development'
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development'
  <% if(options.viewEngine == 'swig'){ %>
  app.engine 'swig', swig.renderFile
  if env == 'development'
		app.set 'view cache', false
		swig.setDefaults cache: false<% } %><% if(options.viewEngine == 'handlebars'){ %>
  app.engine 'handlebars', exphbs(
    layoutsDir: config.root + '/app/views/layouts/'
    defaultLayout: 'main'
    partialsDir: [config.root + '/app/views/partials/']
  )<% } %><% if(options.viewEngine != 'marko'){ %>
  app.set 'views', config.root + '/app/views'
  app.set 'view engine', '<%= options.viewEngine %>'<% } %><% if(options.viewEngine == 'nunjucks'){ %>
  nunjucks.configure config.root + '/app/views',
    autoescape: true
    express: app<% } %>

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

  controllers = glob.sync config.root + '/app/controllers/**/*.coffee'
  controllers.forEach (controller) ->
    require(controller)(app);

  # catch 404 and forward to error handler
  app.use (req, res, next) ->
    err = new Error 'Not Found'
    err.status = 404
    next err

  # error handlers

  # development error handler
  # will print stacktrace
  <% if(options.viewEngine == 'marko'){ %>
  errorTemplate = require('marko').load require.resolve '../app/views/error.marko'<% } %>
  if app.get('env') == 'development'
    app.use (err, req, res, next) ->
      res.status err.status || 500<% if(options.viewEngine == 'marko'){ %>
      errorTemplate.render
        message: err.message,
        error: err
        title: 'error'
      , res<% } else { %>
      res.render 'error',
        message: err.message
        error: err
        title: 'error'<% } %>

  # production error handler
  # no stacktraces leaked to user
  app.use (err, req, res, next) ->
    res.status err.status || 500<% if(options.viewEngine == 'marko'){ %>
    errorTemplate.render
      message: err.message,
      error: {}
      title: 'error'
    , res<% } else { %>
    res.render 'error',
      message: err.message
      error: {}
      title: 'error'<% } %>
