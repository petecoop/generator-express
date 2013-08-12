/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('express generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('express:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'Gruntfile.js',
      '.bowerrc',
      '.gitignore',
      'bower.json',
      'app.js',
      'public/img',
      'public/components',
      'public/js',
      'public/css/style.css',
      'package.json',
      'routes/index.js',
      'routes/user.js',
      'views/index.jade',
      'views/layout.jade'
    ];
    this.app.options.basic = true;
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});

describe('express MVC generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('express:app', [
        '../../app'
      ]);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'Gruntfile.js',
      '.bowerrc',
      '.gitignore',
      'bower.json',
      'app.js',
      'public/img',
      'public/components',
      'public/js',
      'public/css',
      'package.json',
      'config/config.js',
      'config/express.js',
      'config/routes.js',
      'app/controllers',
      'app/controllers/home.js',
      'app/models',
      'app/views',
      'app/views/layout.jade',
      'app/views/404.jade',
      'app/views/home/index.jade'
    ];

    this.app.options.mvc = true;
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
