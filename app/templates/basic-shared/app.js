<% if(options.coffee){ %>require('coffee-script/register');<% } %>

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');<% if(options.viewEngine == 'swig'){ %>
var swig = require('swig');<% } %><% if(options.viewEngine == 'handlebars'){ %>
var exphbs  = require('express-handlebars');<% } %><% if(options.viewEngine == 'nunjucks'){ %>
var nunjucks = require('nunjucks');<% } %>

var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
<% if(options.viewEngine == 'swig'){ %>app.engine('swig', swig.renderFile)
app.set('view cache', false);
swig.setDefaults({ cache: false });<% } %><% if(options.viewEngine == 'handlebars'){ %>
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
}));<% } %><% if(options.viewEngine != 'marko'){ %>
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '<%= options.viewEngine %>');<% } %><% if(options.viewEngine == 'nunjucks'){ %>
nunjucks.configure('views', {
    autoescape: true,
    express: app
});<% } %>

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
<% if(options.viewEngine == 'marko'){ %>
  var errorTemplate = require('marko').load(require.resolve('./views/error.marko'));<% } %>
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);<% if(options.viewEngine == 'marko'){ %>
    errorTemplate.render({
      message: err.message,
      error: err,
      title: 'error'
    }, res);<% } else { %>
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });<% } %>
});


module.exports = app;
