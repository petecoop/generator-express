var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');<% if(options.viewEngine == 'swig'){ %>
var swig = require('swig');<% } %><% if(options.viewEngine == 'handlebars'){ %>
var exphbs  = require('express-handlebars');<% } %><% if(options.viewEngine == 'nunjucks'){ %>
var nunjucks = require('nunjucks');<% } %><% if(options.viewEngine == 'marko'){ %>
require('marko/node-require');
var markoExpress = require('marko/express');<% } %>

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  <% if(options.viewEngine == 'swig'){ %>
  app.engine('swig', swig.renderFile);
  if(env == 'development'){
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
  }<% } %><% if(options.viewEngine == 'handlebars'){ %>
  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/']
  }));<% } %><% if(options.viewEngine != 'marko'){ %>
  app.set('views', config.root + '/app/views');
  app.set('view engine', '<%= options.viewEngine %>');<% } %><% if(options.viewEngine == 'nunjucks'){ %>
  nunjucks.configure(config.root + '/app/views', {
      autoescape: true,
      express: app
  });<% } %>

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());<% if(options.viewEngine == 'marko'){ %>
  app.use(markoExpress());<% } %>

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);<% if(options.viewEngine == 'marko'){ %>
      res.marko(require('../app/views/error'), {
        $global: {locals: req.app.locals},
        message: err.message,
        error: err,
        title: 'error'
      });<% } else { %>
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });<% } %>
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);<% if(options.viewEngine == 'marko'){ %>
    res.marko(require('../app/views/error'), {
      $global: {locals: req.app.locals},
      message: err.message,
      error: {},
      title: 'error'
    });<% } else { %>
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });<% } %>
  });

  return app;
};
