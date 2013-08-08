'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


module.exports = ExpressGenerator;

function ExpressGenerator() {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(ExpressGenerator, yeoman.generators.Base);

ExpressGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
