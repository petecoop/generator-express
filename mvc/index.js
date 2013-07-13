'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = ExpressGenerator;

function ExpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.hookFor('express:common');
}

util.inherits(ExpressGenerator, yeoman.generators.NamedBase);

ExpressGenerator.prototype.setupEnv = function setupEnv() {
  this.sourceRoot(path.join(__dirname, '../templates/mvc'));
  this.directory('.', '.', true);
  this.mkdir('public/img');
  this.mkdir('public/components');
  this.mkdir('public/js');
  this.mkdir('public/css');
  this.mkdir('app/controllers');
  this.mkdir('app/models');
  this.mkdir('app/views');
};

ExpressGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};