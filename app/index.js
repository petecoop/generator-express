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

util.inherits(ExpressGenerator, yeoman.generators.NamedBase);

ExpressGenerator.prototype.buildEnv = function buildEnv() {
  this.sourceRoot(path.join(__dirname, 'templates', 'common'));
  this.directory('.', '.');

  var name = this.options.mvc ? 'mvc' : 'basic';
  this.sourceRoot(path.join(__dirname, 'templates', name));
  this.directory('.', '.');
};

ExpressGenerator.prototype.assetsDirs = function assetsDirs() {
  this.mkdir('public/components');
  this.mkdir('public/js');
  this.mkdir('public/css');
  this.mkdir('public/img');
};

module.exports = ExpressGenerator;
