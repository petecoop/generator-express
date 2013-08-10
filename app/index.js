'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

function ExpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    // console.log('I DONE', this.generatorName);
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.sourceRoot(path.join(__dirname, 'templates', 'common'));
  this.directory('.', '.');

  var name = options.mvc ? 'mvc' : 'basic';
  this.sourceRoot(path.join(__dirname, 'templates', name));
  this.directory('.', '.');
}

util.inherits(ExpressGenerator, yeoman.generators.NamedBase);

ExpressGenerator.prototype.assetsDirs = function assetsDirs() {
  this.mkdir('public/components');
  this.mkdir('public/js');
  this.mkdir('public/css');
  this.mkdir('public/img');
};

module.exports = ExpressGenerator;
