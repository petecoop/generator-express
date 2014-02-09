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
    this.options.viewEngine = response.viewEngine;
    done();
  }.bind(this));
};

ExpressGenerator.prototype.processViewEngineChoice = function () {
  this.viewEnginePackages = [];
  if (this.options.viewEngine === 'Jade') {
    this.viewEnginePackages = ['"jade": "~1.1.5"'];
  } else if (this.options.viewEngine === 'EJS') {
    this.viewEnginePackages = [
      '"ejs": "~0.8.5"',
      '"ejs-locals": "~1.0.2"'
    ];
  }
  this.viewEnginePackages.join(',\n');
};

ExpressGenerator.prototype.buildEnv = function buildEnv() {
  this.sourceRoot(path.join(__dirname, 'templates', 'common'));
  this.directory('.', '.');

  var name = this.options.mvc ? 'mvc' : 'basic';
  this.sourceRoot(path.join(__dirname, 'templates', name));
  this.directory('.', '.');

  var views = this.options.viewEngine.toLowerCase();
  this.sourceRoot(path.join(__dirname, 'templates', 'views', views));
  if (this.options.mvc) {
    this.directory('.', 'app/views');
  } else {
    this.directory('.', 'views');
  }
};

ExpressGenerator.prototype.assetsDirs = function assetsDirs() {
  this.mkdir('public/components');
  this.mkdir('public/js');
  this.mkdir('public/css');
  this.mkdir('public/img');
};

module.exports = ExpressGenerator;
