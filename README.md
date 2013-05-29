# Generator express
[![Build Status](https://secure.travis-ci.org/petecoop/generator-express.png?branch=master)](https://travis-ci.org/petecoop/generator-express)

An Expressjs generator for Yeoman, based on the express command line tool.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-express`
- Run: `yo express`
- Run: `grunt` to run the local server at `localhost:3000`, the grunt tasks include live reloading for .jade views, css in public/stylesheets and restarting the server for changes to app.js or js in routes/

## MVC apps
I've created a new generator for creating MVC style apps in express, it's based around [nodejs-express-mongoose-demo](https://github.com/madhums/nodejs-express-mongoose-demo) however I've included the mongodb-native driver rather than mongoose, this can easily be changed and may be added as an option further down the line.

To get going:
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-express`
- Run: `yo express:mvc`
- Run: `grunt` to run the local server - defaults to `localhost:3000` - port can be changed in `config/config.js`. The grunt tasks include live reloading as before.

##Options
* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
