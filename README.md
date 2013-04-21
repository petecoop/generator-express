# Generator express
[![Build Status](https://secure.travis-ci.org/petecoop/generator-express.png?branch=master)](https://travis-ci.org/petecoop/generator-express)

An Expressjs generator for Yeoman, based on the express command line tool.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-express`
- Run: `yo express`
- Run: `grunt` to run the local server at `localhost:3000`, the grunt tasks include live reloading for .jade views, css in public/stylesheets and restarting the server for changes to app.js or js in routes/

##Options
* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.


## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
