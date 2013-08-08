'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


module.exports = ExpressGenerator;

function ExpressGenerator() {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(ExpressGenerator, yeoman.generators.Base);

ExpressGenerator.prototype.setupEnv = function setupEnv() {
  this.directory('.', '.', true);
  this.mkdir('public/images');
  this.mkdir('public/components');
  this.mkdir('public/javascripts');
};

ExpressGenerator.prototype.packageJSON = function packageJSON() {
  this.template('package.json', 'package.json');
};
