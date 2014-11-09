'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

function ExpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(ExpressGenerator, yeoman.generators.Base);

ExpressGenerator.prototype.promptType = function promptType() {
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
    ]
  }];

  this.prompt(prompt, function (responses) {
    this.options.mvc = responses.type.match(/^MVC$/i) !== null;
    done();
  }.bind(this));
};

ExpressGenerator.prototype.promptViewEngine = function () {

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
      'EJS'
    ]
  }];

  this.prompt(prompt, function (response) {
    this.options.viewEngine = response.viewEngine.toLowerCase();
    done();
  }.bind(this));
};

ExpressGenerator.prototype.promptCssPreprocessor = function () {

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
      'less'
    ]
  }];

  this.prompt(prompt, function (response) {
    this.options.cssPreprocessor = response.cssPreprocessor.toLowerCase();
    done();
  }.bind(this));
};

ExpressGenerator.prototype.promptDatabase = function () {

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
      'PostgreSQL'
    ]
  }];
  this.prompt(prompt, function (response) {
    this.options.database = response.database.toLowerCase();
    done();
  }.bind(this));
};

ExpressGenerator.prototype.promptBuildTool = function () {

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
    ]
  }];

  this.prompt(prompt, function (response) {
    this.options.buildTool = response.buildTool.toLowerCase();
    done();
  }.bind(this));
};

ExpressGenerator.prototype.buildEnv = function buildEnv() {
  this.sourceRoot(path.join(__dirname, 'templates', 'common'));
  this.expandFiles('**', { cwd: this.sourceRoot() }).map(function (file) {
    this.template(file, file.replace(/^_/, ''));
  }, this);

  var name = this.options.mvc ? 'mvc' : 'basic';
  var filetype = 'js';
  if (this.options.coffee) {
    name += '-coffee';
    filetype = 'coffee';
  }
  this.sourceRoot(path.join(__dirname, 'templates', name));
  this.directory('.', '.');

  var views = this.options.viewEngine;
  this.sourceRoot(path.join(__dirname, 'templates', 'views', views));
  if (this.options.mvc) {
    this.directory('.', 'app/views');
  } else {
    this.directory('.', 'views');
  }

  var stylesheets = this.options.cssPreprocessor;
  if (stylesheets === 'sass') {
    this.sourceRoot(path.join(__dirname, 'templates', 'css', 'sass'));
  } else if (stylesheets === 'node-sass') {
    this.sourceRoot(path.join(__dirname, 'templates', 'css', 'sass'));
  } else if (stylesheets === 'less') {
    this.sourceRoot(path.join(__dirname, 'templates', 'css', 'less'));
  } else if (stylesheets === 'none') {
    this.sourceRoot(path.join(__dirname, 'templates', 'css', 'css'));
  }
  this.directory('.', 'public/css');

  if (this.options.database === 'mysql' || this.options.database === 'postgresql') {
    this.copy(path.join(__dirname, 'templates', 'extras', name, 'model-index.' + filetype), 'app/models/index.' + filetype);
  }
  var buildFile = this.options.buildTool === 'grunt' ? 'Gruntfile.js' : 'gulpfile.js';
  this.copy(path.join(__dirname, 'templates', 'extras', name, buildFile), buildFile);
};

ExpressGenerator.prototype.assetsDirs = function assetsDirs() {
  this.mkdir('public');
  this.mkdir('public/components');
  this.mkdir('public/js');
  this.mkdir('public/css');
  this.mkdir('public/img');
};

module.exports = ExpressGenerator;
