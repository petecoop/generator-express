/*global describe, beforeEach, it*/
'use strict';

var assert  = require('yeoman-generator').assert;
var path    = require('path');
var helpers = require('yeoman-generator').test;
var rimraf  = require('rimraf');

var basicExpected = [
  '.bowerrc',
  '.gitignore',
  'bower.json',
  'app.js',
  'public/img',
  'public/components',
  'public/js',
  'package.json',
  'routes/index.js',
  'routes/user.js',
  'bin/www'
];

var MVCExpected = [
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
    if (fileArray[i] === 'app.js') {
      newArray.push(fileArray[i]);
    } else {
      newArray.push(fileArray[i].replace(/(.*?)\.js$/, '$1.coffee'));
    }
  }

  return newArray;
};

var runGenerationTest = function (extraFiles, type, engine, preprocessor, coffee, database, buildTool, callback) {
  var expectedFiles;

  // Never install dependencies
  this.app.options['skip-install'] = true;

  // Set generator options
  this.app.options[type] = true;
  this.app.options.database = database;
  this.app.options.viewEngine = engine;
  this.app.options.cssPreprocessor = preprocessor;
  this.app.options.coffee = coffee;
  this.app.options.buildTool = buildTool;

  // Set up initial file list Basic or MVC
  expectedFiles = extraFiles.concat(appFiles[type]);

  // Set optional files, CSS preprocessor
  if (preprocessor === 'sass') {
    expectedFiles.push('public/css/style.scss');
  } else if (preprocessor === 'node-sass') {
    expectedFiles.push('public/css/style.scss');
  } else if (preprocessor === 'less') {
    expectedFiles.push('public/css/style.less');
  } else if (preprocessor === 'stylus') {
    expectedFiles.push('public/css/style.styl');
  } else {
    expectedFiles.push('public/css/style.css');
  }

  // Set optional files, Coffee
  if (coffee) {
    expectedFiles = toCoffeeFileArray(expectedFiles);
  }

  // Set optional files, Build tool
  if (buildTool === 'grunt') {
    expectedFiles.push('Gruntfile.js');
  } else {
    expectedFiles.push('gulpfile.js');
  }

  // Test files generation
  this.app.run(function () {
    assert.file(expectedFiles);
    callback();
  });
};

describe('Express generator', function () {

  after(function (done) {
    rimraf(__dirname + '/temp', done);
  });

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
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', false, 'none', 'grunt', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', true, 'none', 'grunt', done);
    });

    it('works with gulp', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', true, 'none', 'gulp', done);
    });

    it('creates expected files with sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'grunt', done);
    });

    it('works with gulp and sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp and sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'gulp', done);
    });

    it('creates expected files with node-sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'grunt', done);
    });

    it('works with gulp and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'gulp', done);
    });

    it('creates expected files with less', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'grunt', done);
    });

    it('works with coffee and less', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'grunt', done);
    });

    it('works with gulp and less', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp and less', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'gulp', done);
    });

    it('works with stylus', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'stylus', false, 'none', 'grunt', done);
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
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'none', false, 'none', 'grunt', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'none', true, 'none', 'grunt', done);
    });

    it('creates expected files with sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'sass', false, 'none', 'grunt', done);
    });

    it('creates expected files with node-sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'node-sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'node-sass', false, 'none', 'grunt', done);
    });

    it('creates expected files with less', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt', done);
    });

    it('works with coffee and less', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt', done);
    });
  });

  describe('Basic generator with Swig', function () {
    var expected = [
      'views/index.swig',
      'views/layout.swig',
      'views/error.swig',
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'swig', 'none', false, 'none', 'grunt', done);
    });
  });


  describe('Basic generator with Handlebars', function () {
    var expected = [
      'views/layouts/main.handlebars',
      'views/partials/welcome.handlebars',
      'views/index.handlebars',
      'views/error.handlebars'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'handlebars', 'none', false, 'none', 'grunt', done);
    });
  });

  describe('Basic generator with Marko', function () {
    var expected = [
      'views/components/app-header/template.marko',
      'views/components/app-footer/template.marko',
      'views/index.marko',
      'views/error.marko',
      'views/marko-taglib.json'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'basic', 'marko', 'none', false, 'none', 'grunt', done);
    });
  });


  describe('MVC generator with Jade', function () {
    var expected = [
      'app/views/layout.jade',
      'app/views/error.jade',
      'app/views/index.jade'
    ];
    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'none', 'grunt', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'none', 'grunt', done);
    });

    it('works with gulp', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'none', 'gulp', done);
    });

    it('creates expected files with sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'grunt', done);
    });

    it('works with gulp and sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp and sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'gulp', done);
    });

    it('creates expected files with node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'grunt', done);
    });

    it('works with gulp and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'gulp', done);
    });

    it('creates expected files with less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'grunt', done);
    });

    it('works with coffee and less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'grunt', done);
    });

    it('works with gulp and less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'gulp', done);
    });

    it('works with coffee and gulp and less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'gulp', done);
    });

    it('works with stylus', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'stylus', false, 'none', 'grunt', done);
    });
  });

  describe('MVC generator with EJS', function () {
    var expected = [
      'app/views/header.ejs',
      'app/views/footer.ejs',
      'app/views/error.ejs',
      'app/views/index.ejs'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'none', false, 'none', 'grunt', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'none', true, 'none', 'grunt', done);
    });

    it('creates expected files with sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'sass', false, 'none', 'grunt', done);
    });

    it('creates expected files with node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'node-sass', false, 'none', 'grunt', done);
    });

    it('works with coffee and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'node-sass', false, 'none', 'grunt', done);
    });

    it('creates expected files with less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'less', false, 'none', 'grunt', done);
    });

    it('works with coffee and less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'less', false, 'none', 'grunt', done);
    });
  });

  describe('MVC generator with Swig', function () {
    var expected = [
      'app/views/index.swig',
      'app/views/layout.swig',
      'app/views/error.swig',
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'swig', 'none', false, 'none', 'grunt', done);
    });
  });

  describe('MVC generator with Handlebars', function () {
    var expected = [
      'app/views/layouts/main.handlebars',
      'app/views/partials/welcome.handlebars',
      'app/views/index.handlebars',
      'app/views/error.handlebars',
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'handlebars', 'none', false, 'none', 'grunt', done);
    });
  });

  describe('MVC generator with Marko', function () {
    var expected = [
      'app/views/components/app-header/template.marko',
      'app/views/components/app-footer/template.marko',
      'app/views/index.marko',
      'app/views/error.marko',
      'app/views/marko-taglib.json'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'marko', 'none', false, 'none', 'grunt', done);
    });
  });

  describe('MVC generator with MySQL', function () {
    var expected = [
      'app/models/index.js'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'mysql', 'grunt', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'mysql', 'grunt', done);
    });

    it('creates expected files with sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'mysql', 'grunt', done);
    });

    it('works with coffee and sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'mysql', 'grunt', done);
    });

    it('creates expected files with node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'mysql', 'grunt', done);
    });

    it('works with coffee and node-sass', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'mysql', 'grunt', done);
    });

    it('creates expected files with less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'mysql', 'grunt', done);
    });

    it('works with coffee and less', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'mysql', 'grunt', done);
    });
  });

  describe('MVC generator with RethinkDB', function () {
    var expected = [
      'app/models/index.js',
      'config/thinky.js'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'rethinkdb', 'grunt', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'rethinkdb', 'grunt', done);
    });
  });

  describe('MVC generator with SQLite', function () {
    var expected = [
      'app/models/index.js',
      'data'
    ];

    it('creates expected files', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'sqlite', 'grunt', done);
    });

    it('works with coffee', function (done) {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'sqlite', 'grunt', done);
    });
  });
});
