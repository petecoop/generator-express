/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

var basicExpected = [
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
  'routes/user.js'
];
describe('Basic generator with Jade', function () {
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
      'views/index.jade',
      'views/layout.jade',
      'views/404.jade'
    ];
    var allExpected = expected.concat(basicExpected);
    this.app.options.basic = true;
    this.app.options.viewEngine = 'Jade';
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(allExpected);
      done();
    });
  });
});

var MVCExpected = [
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
  'app/controllers',
  'app/controllers/home.js',
  'app/models',
  'app/views'
];

describe('MVC generator with Jade', function () {
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
      'app/views/layout.jade',
      'app/views/404.jade',
      'app/views/index.jade'
    ];
    var allExpected = expected.concat(MVCExpected);

    this.app.options.mvc = true;
    this.app.options.viewEngine = 'Jade';
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(allExpected);
      done();
    });
  });
});
