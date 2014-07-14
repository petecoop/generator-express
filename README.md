# Generator express
[![Build Status](https://secure.travis-ci.org/petecoop/generator-express.png?branch=master)](https://travis-ci.org/petecoop/generator-express)

An Expressjs generator for Yeoman, based on the express command line tool.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-express`
- Run: `yo express` and select Basic
- Run: `grunt` to run the local server at `localhost:3000`, the grunt tasks include live reloading for .jade views, css in public/css and restarting the server for changes to app.js or js in routes/

## MVC apps
A generator for creating MVC style apps in express. Giving you the choice between MongoDB, MySQL or PostgreSQL databases.

To get going:

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-express`
- Run: `yo express`, select MVC and select your database of choice
- Ensure that the selected database is running on your machine, if running elsewhere the connection string can be changed in `config/config.js`
- Run: `grunt` to run the local server - defaults to `localhost:3000` - port can be changed in `config/config.js`. The grunt tasks include live reloading as before.

##Options

- `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

- `--mvc`

  Installs MVC style scaffolding.

- `--coffee`

  Uses CoffeeScript.

##Testing
Tests are written with mocha.
- Install: `npm install -g mocha`
- Run: `mocha` or `npm test`

##Contributing
Contributors are welcome, please fork and send pull requests! If you have any ideas on how to make this project better then please submit an issue.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
