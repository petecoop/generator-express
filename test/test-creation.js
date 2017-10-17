/*global describe, beforeEach, it*/
'use strict';

var assert  = require('yeoman-assert');
var path    = require('path');
var helpers = require('yeoman-test');
var rimraf  = require('rimraf');

var basicExpected = [
  '.bowerrc',
  '.editorconfig',
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
  '.editorconfig',
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

var runGenerationTest = function (extraFiles, type, engine, preprocessor, coffee, database, buildTool, dir, dirname) {
  var expectedFiles;

  var options = {
    'skip-install': true,
    [type]: true,
    database: database,
    viewEngine: engine,
    cssPreprocessor: preprocessor,
    coffee: coffee,
    buildTool: buildTool,
    createDirectory: dir || false,
    dirname: dirname
  };
  options.type = true;

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
  return helpers.run(path.join(__dirname, '../app'))
    .withOptions(options)
    .then(function () {
      assert.file(expectedFiles);
    });
};

describe('Express generator', function () {

  // after(function (done) {
  //   rimraf(__dirname + '/temp', done);
  // });
  //
  // beforeEach(function (done) {
  //   helpers.testDirectory(path.join(__dirname, 'temp'), err => {
  //     if (err) {
  //       return done(err);
  //     }
  //     done();
  //   });
  // });

  describe('Basic generator with Jade', function () {
    var expected = [
      'views/index.jade',
      'views/layout.jade',
      'views/error.jade'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', false, 'none', 'grunt');
    });

    it('works with coffee', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', true, 'none', 'grunt');
    });

    it('works with gulp', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', false, 'none', 'gulp');
    });

    it('works with coffee and gulp', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'none', true, 'none', 'gulp');
    });

    it('creates expected files with sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'grunt');
    });

    it('works with coffee and sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'grunt');
    });

    it('works with gulp and sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'gulp');
    });

    it('works with coffee and gulp and sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'sass', false, 'none', 'gulp');
    });

    it('creates expected files with node-sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'grunt');
    });

    it('works with coffee and node-sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'grunt');
    });

    it('works with gulp and node-sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'gulp');
    });

    it('works with coffee and gulp and node-sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'node-sass', false, 'none', 'gulp');
    });

    it('creates expected files with less', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'grunt');
    });

    it('works with coffee and less', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'grunt');
    });

    it('works with gulp and less', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'gulp');
    });

    it('works with coffee and gulp and less', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'less', false, 'none', 'gulp');
    });

    it('works with stylus', function () {
      runGenerationTest.call(this, expected, 'basic', 'jade', 'stylus', false, 'none', 'grunt');
    });
  });

  describe('Basic generator with EJS', function () {
    var expected = [
      'views/index.ejs',
      'views/header.ejs',
      'views/footer.ejs',
      'views/error.ejs',
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'none', false, 'none', 'grunt');
    });

    it('works with coffee', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'none', true, 'none', 'grunt');
    });

    it('creates expected files with sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'sass', false, 'none', 'grunt');
    });

    it('works with coffee and sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'sass', false, 'none', 'grunt');
    });

    it('creates expected files with node-sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'node-sass', false, 'none', 'grunt');
    });

    it('works with coffee and node-sass', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'node-sass', false, 'none', 'grunt');
    });

    it('creates expected files with less', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt');
    });

    it('works with coffee and less', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt');
    });

    it('creates a new directory', function () {
      runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt', true, 'express-project');
    });
  });

  describe('Basic generator with Swig', function () {
    var expected = [
      'views/index.swig',
      'views/layout.swig',
      'views/error.swig',
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'basic', 'swig', 'none', false, 'none', 'grunt');
    });
  });

  describe('Basic generator with Nunjucks', function () {
    var expected = [
      'views/index.nunjucks',
      'views/layout.nunjucks',
      'views/error.nunjucks',
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'basic', 'nunjucks', 'none', false, 'none', 'grunt');
    });
  });

  describe('Basic generator with Handlebars', function () {
    var expected = [
      'views/layouts/main.handlebars',
      'views/partials/welcome.handlebars',
      'views/index.handlebars',
      'views/error.handlebars'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'basic', 'handlebars', 'none', false, 'none', 'grunt');
    });
  });

  describe('Basic generator with Marko', function () {
    var expected = [
      'views/index.marko',
      'views/error.marko',
      'views/layout.marko'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'basic', 'marko', 'none', false, 'none', 'grunt');
    });
  });


  describe('MVC generator with Jade', function () {
    var expected = [
      'app/views/layout.jade',
      'app/views/error.jade',
      'app/views/index.jade'
    ];
    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'none', 'grunt');
    });

    it('works with coffee', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'none', 'grunt');
    });

    it('works with gulp', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'none', 'gulp');
    });

    it('works with coffee and gulp', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'none', 'gulp');
    });

    it('creates expected files with sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'grunt');
    });

    it('works with coffee and sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'grunt');
    });

    it('works with gulp and sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'gulp');
    });

    it('works with coffee and gulp and sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'none', 'gulp');
    });

    it('creates expected files with node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'grunt');
    });

    it('works with coffee and node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'grunt');
    });

    it('works with gulp and node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'gulp');
    });

    it('works with coffee and gulp and node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'none', 'gulp');
    });

    it('creates expected files with less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'grunt');
    });

    it('works with coffee and less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'grunt');
    });

    it('works with gulp and less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'gulp');
    });

    it('works with coffee and gulp and less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'none', 'gulp');
    });

    it('works with stylus', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'stylus', false, 'none', 'grunt');
    });
  });

  describe('MVC generator with EJS', function () {
    var expected = [
      'app/views/header.ejs',
      'app/views/footer.ejs',
      'app/views/error.ejs',
      'app/views/index.ejs'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'none', false, 'none', 'grunt');
    });

    it('works with coffee', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'none', true, 'none', 'grunt');
    });

    it('creates expected files with sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'sass', false, 'none', 'grunt');
    });

    it('works with coffee and sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'sass', false, 'none', 'grunt');
    });

    it('creates expected files with node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'node-sass', false, 'none', 'grunt');
    });

    it('works with coffee and node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'node-sass', false, 'none', 'grunt');
    });

    it('creates expected files with less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'less', false, 'none', 'grunt');
    });

    it('works with coffee and less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'ejs', 'less', false, 'none', 'grunt');
    });
  });

  describe('MVC generator with Swig', function () {
    var expected = [
      'app/views/index.swig',
      'app/views/layout.swig',
      'app/views/error.swig',
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'swig', 'none', false, 'none', 'grunt');
    });
  });

  describe('MVC generator with Nunjucks', function () {
    var expected = [
      'app/views/index.nunjucks',
      'app/views/layout.nunjucks',
      'app/views/error.nunjucks',
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'nunjucks', 'none', false, 'none', 'grunt');
    });
  });

  describe('MVC generator with Handlebars', function () {
    var expected = [
      'app/views/layouts/main.handlebars',
      'app/views/partials/welcome.handlebars',
      'app/views/index.handlebars',
      'app/views/error.handlebars',
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'handlebars', 'none', false, 'none', 'grunt');
    });
  });

  describe('MVC generator with Marko', function () {
    var expected = [
      'app/views/index.marko',
      'app/views/error.marko',
      'app/views/layout.marko'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'marko', 'none', false, 'none', 'grunt');
    });
  });

  describe('MVC generator with MySQL', function () {
    var expected = [
      'app/models/index.js'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'mysql', 'grunt');
    });

    it('works with coffee', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'mysql', 'grunt');
    });

    it('creates expected files with sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'mysql', 'grunt');
    });

    it('works with coffee and sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'sass', false, 'mysql', 'grunt');
    });

    it('creates expected files with node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'mysql', 'grunt');
    });

    it('works with coffee and node-sass', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'node-sass', false, 'mysql', 'grunt');
    });

    it('creates expected files with less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'mysql', 'grunt');
    });

    it('works with coffee and less', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'less', false, 'mysql', 'grunt');
    });
  });

  describe('MVC generator with RethinkDB', function () {
    var expected = [
      'app/models/index.js',
      'config/thinky.js'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'rethinkdb', 'grunt');
    });

    it('works with coffee', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'rethinkdb', 'grunt');
    });
  });

  describe('MVC generator with SQLite', function () {
    var expected = [
      'app/models/index.js',
      'data'
    ];

    it('creates expected files', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', false, 'sqlite', 'grunt');
    });

    it('works with coffee', function () {
      runGenerationTest.call(this, expected, 'mvc', 'jade', 'none', true, 'sqlite', 'grunt');
    });
  });
});
