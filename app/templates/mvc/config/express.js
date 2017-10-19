const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');<% if(options.viewEngine == 'swig'){ %>
const swig = require('swig');<% } %><% if(options.viewEngine == 'handlebars'){ %>
const exphbs  = require('express-handlebars');<% } %><% if(options.viewEngine == 'nunjucks'){ %>
const nunjucks = require('nunjucks');<% } %><% if(options.viewEngine == 'marko'){ %>
require('marko/node-require');
const markoExpress = require('marko/express');<% } %>

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  <% if(options.viewEngine == 'swig'){ %>
  app.engine('swig', swig.renderFile);
  if (env == 'development') {
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
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
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

  app.use((err, req, res, next) => {
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
