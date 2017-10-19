<% if(options.coffee){ %>require('coffee-script/register');<% } %>
<% if(options.viewEngine == 'marko'){ %>require('marko/node-require');<% } %>

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');<% if(options.viewEngine == 'swig'){ %>
const swig = require('swig');<% } %><% if(options.viewEngine == 'handlebars'){ %>
const exphbs  = require('express-handlebars');<% } %><% if(options.viewEngine == 'nunjucks'){ %>
const nunjucks = require('nunjucks');<% } %><% if(options.viewEngine == 'marko'){ %>
const markoExpress = require('marko/express');<% } %>

const routes = require('./routes/index');
const users = require('./routes/user');

const app = express();

const env = process.env.NODE_ENV || 'development';
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
app.use(express.static(path.join(__dirname, 'public')));<% if(options.viewEngine == 'marko'){ %>
app.use(markoExpress());<% } %>

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);<% if(options.viewEngine == 'marko'){ %>
        res.marko(require('./views/error'), {
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

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);<% if(options.viewEngine == 'marko'){ %>
    res.marko(require('./views/error'), {
      $global: {locals: req.app.locals},
      message: err.message,
      error: err,
      title: 'error'
    });<% } else { %>
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });<% } %>
});

module.exports = app;
