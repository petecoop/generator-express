express = require 'express'

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
    app.use bodyParser.json
    app.use bodyParser.urlencoded
    app.use cookieParser
    app.use compress
    app.use express.static config.root + '/public'
    app.use methodOverride

    app.use (req, res, next) ->
        err = new Error 'Not Found'
        err.status = 404
        next err

    if app.get 'env' == 'development'
        app.use (err, req, res) ->
            res.status err.status || 500
            res.render 'error',
                message: err.message,
                error: err,
                title: 'error'

    app.use (err, req, res) ->
        res.status err.status || 500
        res.render 'error',
            message: err.message,
            error: {},
            title: 'error'
