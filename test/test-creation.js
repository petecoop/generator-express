/*global describe, beforeEach, it*/
'use strict';

var assert  = require('yeoman-generator').assert;
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
  'routes/user.js',
  'bin/www'
];

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

var appFiles = {
  basic: basicExpected,
  mvc: MVCExpected
};

var toCoffeeFileArray = function (fileArray) {
  var newArray = [];
  for (var i in fileArray) {
    if (fileArray[i] === 'app.js' || fileArray[i] === 'Gruntfile.js') {
      newArray.push(fileArray[i]);
    } else {
      newArray.push(fileArray[i].replace(/(.*?)\.js$/, '$1.coffee'));
    }
  }

  return newArray;
};

var runGenerationTest = function (extraFiles, type, engine, coffee, database, callback) {
  var expectedFiles;
  this.app.options[type] = true;
  this.app.options['skip-install'] = true;
  this.app.options.database = database;
  this.app.options.viewEngine = engine;
  this.app.options.coffee = coffee;
  expectedFiles = extraFiles.concat(appFiles[type]);
  if (this.app.options.coffee) {
    expectedFiles = toCoffeeFileArray(expectedFiles);
  }
  this.app.run({}, function () {
    assert.file(expectedFiles);
    callback();
  });
};

describe('Express generator', function () {
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

  describe('Basic generator with Jade', function () {
    var expected = [
      'views/index.jade',
      'views/layout.jade',
      'views/error.jade'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', false, 'none', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', true, 'none', done);
    });
  });

  describe('Basic generator with EJS', function () {
    var expected = [
      'views/index.ejs',
      'views/header.ejs',
      'views/footer.ejs',
      'views/error.ejs',
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', false, 'none', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', true, 'none', done);
    });
  });


  describe('MVC generator with Jade', function () {
    var expected = [
      'app/views/layout.jade',
      'app/views/error.jade',
      'app/views/index.jade'
    ];
    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', false, 'none', done);
    });

    it('works with coffee', function (done) {
      var expected = [
        'app/views/layout.jade',
        'app/views/error.jade',
        'app/views/index.jade'
      ];
      runGenerationTest.call(this, expected, 'mvc', 'jade', true, 'none', done);
    });
  });

  describe('MVC generator with EJS', function () {
    it('creates expected files', function (done) {
      var expected = [
        'app/views/header.ejs',
        'app/views/footer.ejs',
        'app/views/error.ejs',
        'app/views/index.ejs'
      ];
      runGenerationTest.call(this, expected, 'mvc', 'ejs', false, 'none', done);
    });

    it('works with coffee', function (done) {
      var expected = [
        'app/views/header.ejs',
        'app/views/footer.ejs',
        'app/views/error.ejs',
        'app/views/index.ejs'
      ];
      runGenerationTest.call(this, expected, 'mvc', 'ejs', true, 'none', done);
    });
  });

  describe('MVC generator with MySQL', function () {
    it('creates expected files', function (done) {
      var expected = [
        'app/models/index.js'
      ];
      runGenerationTest.call(this, expected, 'mvc', 'jade', false, 'mysql', done);
    });

    it('works with coffee', function (done) {
      var expected = [
        'app/models/index.js'
      ];
      runGenerationTest.call(this, expected, 'mvc', 'jade', true, 'mysql', done);
    });
  });
});
