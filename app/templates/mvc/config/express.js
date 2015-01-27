var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var compress = require('compression');
var methodOverride = require('method-override');<% if(options.viewEngine == 'swig'){ %>
var swig = require('swig');<% } %><% if(options.viewEngine == 'handlebars'){ %>
var exphbs  = require('express-handlebars');<% } %>

module.exports = function(app, config) {<% if(options.viewEngine == 'swig'){ %>
  app.engine('swig', swig.renderFile)<% } %><% if(options.viewEngine == 'handlebars'){ %>
  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/']
  }));<% } %><% if(options.viewEngine != 'marko'){ %>
  app.set('views', config.root + '/app/views');
  app.set('view engine', '<%= options.viewEngine %>');<% } %>

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(multer());
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  <% if(options.viewEngine == 'marko'){ %>
  var errorTemplate = require('marko').load(require.resolve('../app/views/error.marko'));<% } %>
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);<% if(options.viewEngine == 'marko'){ %>
      errorTemplate.render({
        message: err.message,
        error: err,
        title: 'error'
      }, res);<% } else { %>
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });<% } %>
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);<% if(options.viewEngine == 'marko'){ %>
      errorTemplate.render({
        message: err.message,
        error: {},
        title: 'error'
      }, res);<% } else { %>
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });<% } %>
  });

};
