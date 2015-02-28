'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    // add option to skip install
    this.option('skip-install');

  },
  prompting: {
    type: function () {
      // Short circuit if an option was explicitly specified
      if (this.options.mvc || this.options.basic) {
        return true;
      }

      var done = this.async();
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

      this.prompt(prompt, function (responses) {
        this.options.mvc = responses.type.match(/^MVC$/i) !== null;
        done();
      }.bind(this));
    },
    viewEngine: function () {

      if (this.options.viewEngine) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'list',
        name: 'viewEngine',
        message: 'Select a view engine to use:',
        choices: [
          'Jade',
          'Swig',
          'EJS',
          'Handlebars',
          'Marko'
        ],
        store: true
      }];

      this.prompt(prompt, function (response) {
        this.options.viewEngine = response.viewEngine.toLowerCase();
        done();
      }.bind(this));
    },
    cssPreprocessor: function () {

      if (this.options.cssPreprocessor) {
        return true;
      }

      var done = this.async();
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

      this.prompt(prompt, function (response) {
        this.options.cssPreprocessor = response.cssPreprocessor.toLowerCase();
        done();
      }.bind(this));
    },
    database: function () {

      if (this.options.database || !this.options.mvc) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'list',
        name: 'database',
        message: 'Select a database to use:',
        choices: [
          'None',
          'MongoDB',
          'MySQL',
          'PostgreSQL',
          'RethinkDB'
        ],
        store: true
      }];
      this.prompt(prompt, function (response) {
        this.options.database = response.database.toLowerCase();
        done();
      }.bind(this));
    },
    buildTool: function () {

      if (this.options.buildTool) {
        return true;
      }

      var done = this.async();
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

      this.prompt(prompt, function (response) {
        this.options.buildTool = response.buildTool.toLowerCase();
        done();
      }.bind(this));

    }
  },
  writing: {
    buildEnv: function () {

      var name = this.options.mvc ? 'mvc' : 'basic';
      var suffix = this.options.coffee ? '-coffee' : '';
      this.filetype = 'js';
      if(this.options.coffee) this.filetype = 'coffee';

      // shared across all generators
      this.sourceRoot(path.join(__dirname, 'templates', 'shared'));
      this.expandFiles('**', { cwd: this.sourceRoot() }).map(function (file) {
        this.template(file, file.replace(/^_/, ''));
      }, this);


      // shared for mvc/basic generators
      this.sourceRoot(path.join(__dirname, 'templates', name + '-shared'));
      this.directory('.', '.');


      // templates
      this.sourceRoot(path.join(__dirname, 'templates', name + suffix));
      this.directory('.', '.');

      // views
      var views = this.options.viewEngine;
      this.sourceRoot(path.join(__dirname, 'templates', 'views', views));
      if (this.options.mvc) {
        this.directory('.', 'app/views');
      } else {
        this.directory('.', 'views');
      }

      // css
      var stylesheets = this.options.cssPreprocessor;
      if(stylesheets === 'none') stylesheets = 'css';
      if(stylesheets === 'node-sass') stylesheets = 'sass';
      this.sourceRoot(path.join(__dirname, 'templates', 'css', stylesheets));
      this.directory('.', 'public/css');

      // grunt/gulp
      var buildFile = this.options.buildTool === 'grunt' ? 'Gruntfile.js' : 'gulpfile.js';
      this.copy(path.join(__dirname, 'templates', 'extras', name + '-shared', buildFile), buildFile);

      // sequelize extra stuff
      if (this.options.database === 'mysql' || this.options.database === 'postgresql') {
        this.copy(path.join(__dirname, 'templates', 'extras', name + suffix, 'sequelize-model-index.' + this.filetype), 'app/models/index.' + this.filetype);
      }

      //thinky extra stuff
      if (this.options.database === 'rethinkdb') {
        this.copy(path.join(__dirname, 'templates', 'extras', name + suffix, 'thinky-model-index.' + this.filetype), 'app/models/index.' + this.filetype);
        this.copy(path.join(__dirname, 'templates', 'extras', name + suffix, 'thinky-config.' + this.filetype), 'config/thinky.' + this.filetype);
      }

    },
    assetsDirs: function () {
      this.mkdir('public');
      this.mkdir('public/components');
      this.mkdir('public/js');
      this.mkdir('public/css');
      this.mkdir('public/img');
    }
  },
  install: function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  }
});
