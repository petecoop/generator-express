'use strict';

const assert = require('yeoman-assert');
const path = require('path');
const helpers = require('yeoman-test');

const basicExpected = [
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
  'bin/www',
];

const MVCExpected = [
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
  'app/views',
];

const appFiles = {
  basic: basicExpected,
  mvc: MVCExpected,
};

const runGenerationTest = (extraFiles, type, viewEngine, cssPreprocessor, coffee, database, buildTool, dir, dirname) => {
  let expectedFiles;

  const options = {
    'skip-install': true,
    'skip-insights': true,
    [type]: true,
    createDirectory: dir || false,
    database,
    viewEngine,
    cssPreprocessor,
    coffee,
    buildTool,
    dirname,
  };
  options.type = true;

  // Set up initial file list Basic or MVC
  expectedFiles = extraFiles.concat(appFiles[type]);

  // Set optional files, CSS preprocessor
  if (cssPreprocessor === 'sass') {
    expectedFiles.push('public/css/style.scss');
  } else if (cssPreprocessor === 'node-sass') {
    expectedFiles.push('public/css/style.scss');
  } else if (cssPreprocessor === 'less') {
    expectedFiles.push('public/css/style.less');
  } else if (cssPreprocessor === 'stylus') {
    expectedFiles.push('public/css/style.styl');
  } else {
    expectedFiles.push('public/css/style.css');
  }

  // Set optional files, Coffee
  if (coffee) {
    expectedFiles = expectedFiles.map((filename) => {
      return filename === 'app.js' ? filename : filename.replace(/(.*?)\.js$/, '$1.coffee');
    });
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
    .then(() => assert.file(expectedFiles));
};

describe('Express generator', () => {

  describe('Basic generator with Pug', () => {
    const expected = [
      'views/index.pug',
      'views/layout.pug',
      'views/error.pug'
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'none', false, 'none', 'grunt'));
    it('works with coffee', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'none', true, 'none', 'grunt'));
    it('works with gulp', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'none', false, 'none', 'gulp'));
    it('works with coffee and gulp', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'none', true, 'none', 'gulp'));
    it('creates expected files with sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'sass', false, 'none', 'grunt'));
    it('works with coffee and sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'sass', false, 'none', 'grunt'));
    it('works with gulp and sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'sass', false, 'none', 'gulp'));
    it('works with coffee and gulp and sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'sass', false, 'none', 'gulp'));
    it('creates expected files with node-sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'node-sass', false, 'none', 'grunt'));
    it('works with coffee and node-sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'node-sass', false, 'none', 'grunt'));
    it('works with gulp and node-sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'node-sass', false, 'none', 'gulp'));
    it('works with coffee and gulp and node-sass', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'node-sass', false, 'none', 'gulp'));
    it('creates expected files with less', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'less', false, 'none', 'grunt'));
    it('works with coffee and less', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'less', false, 'none', 'grunt'));
    it('works with gulp and less', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'less', false, 'none', 'gulp'));
    it('works with coffee and gulp and less', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'less', false, 'none', 'gulp'));
    it('works with stylus', () => runGenerationTest.call(this, expected, 'basic', 'pug', 'stylus', false, 'none', 'grunt'));
  });

  describe('Basic generator with EJS', () => {
    const expected = [
      'views/index.ejs',
      'views/header.ejs',
      'views/footer.ejs',
      'views/error.ejs',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'none', false, 'none', 'grunt'));
    it('works with coffee', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'none', true, 'none', 'grunt'));
    it('creates expected files with sass', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'sass', false, 'none', 'grunt'));
    it('works with coffee and sass', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'sass', false, 'none', 'grunt'));
    it('creates expected files with node-sass', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'node-sass', false, 'none', 'grunt'));
    it('works with coffee and node-sass', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'node-sass', false, 'none', 'grunt'));
    it('creates expected files with less', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt'));
    it('works with coffee and less', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt'));
    it('creates a new directory', () => runGenerationTest.call(this, expected, 'basic', 'ejs', 'less', false, 'none', 'grunt', true, 'express-project'));
  });

  describe('Basic generator with Swig', () => {
    const expected = [
      'views/index.swig',
      'views/layout.swig',
      'views/error.swig',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'basic', 'swig', 'none', false, 'none', 'grunt'));
  });

  describe('Basic generator with Nunjucks', () => {
    const expected = [
      'views/index.nunjucks',
      'views/layout.nunjucks',
      'views/error.nunjucks',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'basic', 'nunjucks', 'none', false, 'none', 'grunt'));
  });

  describe('Basic generator with Handlebars', () => {
    const expected = [
      'views/layouts/main.handlebars',
      'views/partials/welcome.handlebars',
      'views/index.handlebars',
      'views/error.handlebars',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'basic', 'handlebars', 'none', false, 'none', 'grunt'));
  });

  describe('Basic generator with Marko', () => {
    const expected = [
      'views/index.marko',
      'views/error.marko',
      'views/layout.marko',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'basic', 'marko', 'none', false, 'none', 'grunt'));
  });

  describe('MVC generator with Pug', () => {
    const expected = [
      'app/views/layout.pug',
      'app/views/error.pug',
      'app/views/index.pug',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', false, 'none', 'grunt'));
    it('works with coffee', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', true, 'none', 'grunt'));
    it('works with gulp', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', false, 'none', 'gulp'));
    it('works with coffee and gulp', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', true, 'none', 'gulp'));
    it('creates expected files with sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'sass', false, 'none', 'grunt'));
    it('works with coffee and sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'sass', false, 'none', 'grunt'));
    it('works with gulp and sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'sass', false, 'none', 'gulp'));
    it('works with coffee and gulp and sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'sass', false, 'none', 'gulp'));
    it('creates expected files with node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'node-sass', false, 'none', 'grunt'));
    it('works with coffee and node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'node-sass', false, 'none', 'grunt'));
    it('works with gulp and node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'node-sass', false, 'none', 'gulp'));
    it('works with coffee and gulp and node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'node-sass', false, 'none', 'gulp'));
    it('creates expected files with less', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'less', false, 'none', 'grunt'));
    it('works with coffee and less', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'less', false, 'none', 'grunt'));
    it('works with gulp and less', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'less', false, 'none', 'gulp'));
    it('works with coffee and gulp and less', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'less', false, 'none', 'gulp'));
    it('works with stylus', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'stylus', false, 'none', 'grunt'));
  });

  describe('MVC generator with EJS', () => {
    const expected = [
      'app/views/header.ejs',
      'app/views/footer.ejs',
      'app/views/error.ejs',
      'app/views/index.ejs',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'none', false, 'none', 'grunt'));
    it('works with coffee', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'none', true, 'none', 'grunt'));
    it('creates expected files with sass', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'sass', false, 'none', 'grunt'));
    it('works with coffee and sass', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'sass', false, 'none', 'grunt'));
    it('creates expected files with node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'node-sass', false, 'none', 'grunt'));
    it('works with coffee and node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'node-sass', false, 'none', 'grunt'));
    it('creates expected files with less', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'less', false, 'none', 'grunt'));
    it('works with coffee and less', () => runGenerationTest.call(this, expected, 'mvc', 'ejs', 'less', false, 'none', 'grunt'));
  });

  describe('MVC generator with Swig', () => {
    const expected = [
      'app/views/index.swig',
      'app/views/layout.swig',
      'app/views/error.swig',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'swig', 'none', false, 'none', 'grunt'));
  });

  describe('MVC generator with Nunjucks', () => {
    const expected = [
      'app/views/index.nunjucks',
      'app/views/layout.nunjucks',
      'app/views/error.nunjucks',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'nunjucks', 'none', false, 'none', 'grunt'));
  });

  describe('MVC generator with Handlebars', () => {
    const expected = [
      'app/views/layouts/main.handlebars',
      'app/views/partials/welcome.handlebars',
      'app/views/index.handlebars',
      'app/views/error.handlebars',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'handlebars', 'none', false, 'none', 'grunt'));
  });

  describe('MVC generator with Marko', () => {
    const expected = [
      'app/views/index.marko',
      'app/views/error.marko',
      'app/views/layout.marko',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'marko', 'none', false, 'none', 'grunt'));
  });

  describe('MVC generator with MySQL', () => {
    const expected = [
      'app/models/index.js',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', false, 'mysql', 'grunt'));
    it('works with coffee', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', true, 'mysql', 'grunt'));
    it('creates expected files with sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'sass', false, 'mysql', 'grunt'));
    it('works with coffee and sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'sass', false, 'mysql', 'grunt'));
    it('creates expected files with node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'node-sass', false, 'mysql', 'grunt'));
    it('works with coffee and node-sass', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'node-sass', false, 'mysql', 'grunt'));
    it('creates expected files with less', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'less', false, 'mysql', 'grunt'));
    it('works with coffee and less', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'less', false, 'mysql', 'grunt'));
  });

  describe('MVC generator with RethinkDB', () => {
    const expected = [
      'app/models/index.js',
      'config/thinky.js',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', false, 'rethinkdb', 'grunt'))
    it('works with coffee', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', true, 'rethinkdb', 'grunt'));
  });

  describe('MVC generator with SQLite', () => {
    const expected = [
      'app/models/index.js',
      'data',
    ];
    it('creates expected files', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', false, 'sqlite', 'grunt'));
    it('works with coffee', () => runGenerationTest.call(this, expected, 'mvc', 'pug', 'none', true, 'sqlite', 'grunt'));
  });
});
