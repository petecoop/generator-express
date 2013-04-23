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
	this.sourceRoot(path.join(__dirname, '../templates/common'));
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
