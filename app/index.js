'use strict';
var path = require('path');
var Generator = require('yeoman-generator');
var glob = require('glob');
var slugify = require('underscore.string/slugify');
var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  constructor: function () {
    Generator.apply(this, arguments);

    // add option to skip install
    this.option('skip-install');

    this.slugify = slugify;
  },
  prompting: {
    dir: function () {

      if (this.options.createDirectory !== undefined) {
        return true;
      }

      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?'
      }];

      return this.prompt(prompt).then(function (response) {
        this.options.createDirectory = response.createDirectory;
      }.bind(this));
    },
    dirname: function () {
      if (!this.options.createDirectory || this.options.dirname) {
        return true;
      }

      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: 'Enter directory name'
      }];

      return this.prompt(prompt).then(function (response) {
        this.options.dirname = response.dirname;
      }.bind(this));
    },
    type: function () {
      // Short circuit if an option was explicitly specified
      if (this.options.mvc || this.options.basic) {
        return true;
      }

      var prompt = [{
        type: 'list',
        name: 'type',
        message: 'Select a version to install:',
        choices: [
          'Basic',
          'MVC'
        ],
        store: true
      }];

      return this.prompt(prompt).then(function (responses) {
        this.options.mvc = responses.type.match(/^MVC$/i) !== null;
      }.bind(this));
    },
    viewEngine: function () {

      if (this.options.viewEngine) {
        return true;
      }

      var prompt = [{
        type: 'list',
        name: 'viewEngine',
        message: 'Select a view engine to use:',
        choices: [
          'Jade',
          'Swig',
          'EJS',
          'Handlebars',
          'Marko',
          'Nunjucks'
        ],
        store: true
      }];

      return this.prompt(prompt).then(function (response) {
        this.options.viewEngine = response.viewEngine.toLowerCase();
      }.bind(this));
    },
    cssPreprocessor: function () {

      if (this.options.cssPreprocessor) {
        return true;
      }

      var prompt = [{
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Select a css preprocessor to use (Sass Requires Ruby):' ,
        choices: [
          'None',
          'Node-Sass',
          'Sass',
          'less',
          'Stylus'
        ],
        store: true
      }];

      return this.prompt(prompt).then(function (response) {
        this.options.cssPreprocessor = response.cssPreprocessor.toLowerCase();
      }.bind(this));
    },
    database: function () {

      if (this.options.database || !this.options.mvc) {
        return true;
      }

      var prompt = [{
        type: 'list',
        name: 'database',
        message: 'Select a database to use:',
        choices: [
          'None',
          'MongoDB',
          'MySQL',
          'PostgreSQL',
          'RethinkDB',
          'SQLite'
        ],
        store: true
      }];

      return this.prompt(prompt).then(function (response) {
        this.options.database = response.database.toLowerCase();
      }.bind(this));
    },
    buildTool: function () {

      if (this.options.buildTool) {
        return true;
      }

      var prompt = [{
        type: 'list',
        name: 'buildTool',
        message: 'Select a build tool to use:',
        choices: [
          'Grunt',
          'Gulp'
        ],
        store: true
      }];

      return this.prompt(prompt).then(function (response) {
        this.options.buildTool = response.buildTool.toLowerCase();
      }.bind(this));

    }
  },
  writing: {
    buildEnv: function () {

      // create directory
      if(this.options.createDirectory){
        this.destinationRoot(this.options.dirname);
        this.appname = this.options.dirname;
      }

      var name = this.options.mvc ? 'mvc' : 'basic';
      var suffix = this.options.coffee ? '-coffee' : '';
      this.filetype = this.options.coffee ? 'coffee' : 'js';

      // shared across all generators
      this.sourceRoot(path.join(__dirname, 'templates', 'shared'));
      glob.sync('**', { cwd: this.sourceRoot() }).map(function (file) {
        this.fs.copyTpl(this.templatePath(file), this.destinationPath(file.replace(/^_/, '')), this);
      }, this);


      // shared for mvc/basic generators
      this.sourceRoot(path.join(__dirname, 'templates', name + '-shared'));
      this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this);

      // mvc tests
      var supported = [
        'mysql',
        'postgresql',
        'rethinkdb',
        'sqlite'
      ];
      if (this.options.mvc && supported.indexOf(this.options.database) !== -1) {
        this.sourceRoot(path.join(__dirname, 'templates', 'mvc-test'));
        this.fs.copyTpl(this.templatePath('.'), this.destinationPath('test'), this);
      }

      // templates
      this.sourceRoot(path.join(__dirname, 'templates', name + suffix));
      this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this);

      // views
      var views = this.options.viewEngine;
      this.sourceRoot(path.join(__dirname, 'templates', 'views', views));
      if (this.options.mvc) {
        if (this.options.viewEngine == 'ejs') {
          this.fs.copy(this.templatePath('.'), this.destinationPath('app/views'));
        } else {
          this.fs.copyTpl(this.templatePath('.'), this.destinationPath('app/views'), this);
        }
      } else {
        if (this.options.viewEngine == 'ejs') {
          this.fs.copy(this.templatePath('.'), this.destinationPath('views'));
        } else {
          this.fs.copyTpl(this.templatePath('.'), this.destinationPath('views'), this);
        }
      }

      // css
      var stylesheets = this.options.cssPreprocessor;
      if(stylesheets === 'none') stylesheets = 'css';
      if(stylesheets === 'node-sass') stylesheets = 'sass';
      this.sourceRoot(path.join(__dirname, 'templates', 'css', stylesheets));
      this.fs.copyTpl(this.templatePath('.'), this.destinationPath('public/css'), this);

      // grunt/gulp
      var buildFile = this.options.buildTool === 'grunt' ? 'Gruntfile.js' : 'gulpfile.js';
      this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', name + '-shared', buildFile)), this.destinationPath(buildFile), this);

      // sequelize extra stuff
      if (this.options.database === 'mysql' ||
          this.options.database === 'postgresql' ||
          this.options.database === 'sqlite') {
        this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', name + suffix, 'sequelize-model-index.' + this.filetype)), this.destinationPath('app/models/index.' + this.filetype), this);
      }

      //thinky extra stuff
      if (this.options.database === 'rethinkdb') {
        this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', name + suffix, 'thinky-model-index.' + this.filetype)), this.destinationPath('app/models/index.' + this.filetype), this);
        this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', name + suffix, 'thinky-config.' + this.filetype)), this.destinationPath('config/thinky.' + this.filetype), this);
      }

    },
    assetsDirs: function () {
      mkdirp.sync('public');
      mkdirp.sync('public/components');
      mkdirp.sync('public/js');
      mkdirp.sync('public/css');
      mkdirp.sync('public/img');
      if (this.options.database == 'sqlite') {
        mkdirp.sync('data');
      }
    }
  },
  install: function () {
    if (!this.options['skip-install']) this.installDependencies();
  }
});
