'use strict';

const path = require('path');
const Generator = require('yeoman-generator');
const glob = require('glob');
const slugify = require('underscore.string/slugify');
const mkdirp = require('mkdirp');
const Insight = require('insight');
const pkg = require('../package.json');

const insight = new Insight({
  trackingCode: 'UA-27236136-2',
  pkg,
});

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // add option to skip install
    this.option('skip-install');

    this.slugify = slugify;
  }

  dir() {
    if (this.options.createDirectory !== undefined) {
      return true;
    }

    const prompt = [{
      type: 'confirm',
      name: 'createDirectory',
      message: 'Would you like to create a new directory for your project?',
    }];

    return this.prompt(prompt).then((response) => {
      this.options.createDirectory = response.createDirectory;
    });
  }

  dirname() {
    if (!this.options.createDirectory || this.options.dirname) {
      return true;
    }

    const prompt = [{
      type: 'input',
      name: 'dirname',
      message: 'Enter directory name',
    }];

    return this.prompt(prompt).then((response) => {
      this.options.dirname = response.dirname;
    });
  }

  type() {
    // Short circuit if an option was explicitly specified
    if (this.options.mvc || this.options.basic) {
      return true;
    }

    const prompt = [{
      type: 'list',
      name: 'type',
      message: 'Select a version to install:',
      choices: [
        'Basic',
        'MVC',
      ],
      store: true,
    }];

    return this.prompt(prompt).then((responses) => {
      this.options.mvc = responses.type.match(/^MVC$/i) !== null;
    });
  }

  viewEngine() {
    if (this.options.viewEngine) {
      return true;
    }

    const prompt = [{
      type: 'list',
      name: 'viewEngine',
      message: 'Select a view engine to use:',
      choices: [
        'Pug',
        'Swig',
        'EJS',
        'Handlebars',
        'Marko',
        'Nunjucks',
      ],
      store: true,
    }];

    return this.prompt(prompt).then((response) => {
      this.options.viewEngine = response.viewEngine.toLowerCase();
    });
  }

  cssPreprocessor() {
    if (this.options.cssPreprocessor) {
      return true;
    }

    const prompt = [{
      type: 'list',
      name: 'cssPreprocessor',
      message: 'Select a css preprocessor to use (Sass Requires Ruby):' ,
      choices: [
        'None',
        'Node-Sass',
        'Sass',
        'less',
        'Stylus',
      ],
      store: true,
    }];

    return this.prompt(prompt).then((response) => {
      this.options.cssPreprocessor = response.cssPreprocessor.toLowerCase();
    });
  }

  database() {
    if (this.options.database || !this.options.mvc) {
      return true;
    }

    const prompt = [{
      type: 'list',
      name: 'database',
      message: 'Select a database to use:',
      choices: [
        'None',
        'MongoDB',
        'MySQL',
        'PostgreSQL',
        'RethinkDB',
        'SQLite',
      ],
      store: true,
    }];

    return this.prompt(prompt).then((response) => {
      this.options.database = response.database.toLowerCase();
    });
  }

  buildTool() {
    if (this.options.buildTool) {
      return true;
    }

    const prompt = [{
      type: 'list',
      name: 'buildTool',
      message: 'Select a build tool to use:',
      choices: [
        'Grunt',
        'Gulp',
      ],
      store: true,
    }];

    return this.prompt(prompt).then((response) => {
      this.options.buildTool = response.buildTool.toLowerCase();
    });
  }

  writing() {
    // create directory
    if (this.options.createDirectory) {
      this.destinationRoot(this.options.dirname);
      this.appname = this.options.dirname;
    }

    const name = this.options.mvc ? 'mvc' : 'basic';
    const suffix = this.options.coffee ? '-coffee' : '';
    this.filetype = this.options.coffee ? 'coffee' : 'js';

    // shared across all generators
    this.sourceRoot(path.join(__dirname, 'templates', 'shared'));
    glob.sync('**', { cwd: this.sourceRoot() }).forEach((file) => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file.replace(/^_/, '')), this);
    });

    // shared for mvc/basic generators
    this.sourceRoot(path.join(__dirname, 'templates', `${name}-shared`));
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this);

    // mvc tests
    const supported = [
      'mysql',
      'postgresql',
      'rethinkdb',
      'sqlite',
    ];
    if (this.options.mvc && supported.indexOf(this.options.database) !== -1) {
      this.sourceRoot(path.join(__dirname, 'templates', 'mvc-test'));
      this.fs.copyTpl(this.templatePath('.'), this.destinationPath('test'), this);
    }

    // templates
    this.sourceRoot(path.join(__dirname, 'templates', name + suffix));
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('.'), this);

    // views
    const views = this.options.viewEngine;
    this.sourceRoot(path.join(__dirname, 'templates', 'views', views));
    if (this.options.mvc) {
      if (this.options.viewEngine === 'ejs') {
        this.fs.copy(this.templatePath('.'), this.destinationPath('app/views'));
      } else {
        this.fs.copyTpl(this.templatePath('.'), this.destinationPath('app/views'), this);
      }
    } else if (this.options.viewEngine === 'ejs') {
      this.fs.copy(this.templatePath('.'), this.destinationPath('views'));
    } else {
      this.fs.copyTpl(this.templatePath('.'), this.destinationPath('views'), this);
    }

    // css
    let stylesheets = this.options.cssPreprocessor;
    if (stylesheets === 'none') stylesheets = 'css';
    if (stylesheets === 'node-sass') stylesheets = 'sass';
    this.sourceRoot(path.join(__dirname, 'templates', 'css', stylesheets));
    this.fs.copyTpl(this.templatePath('.'), this.destinationPath('public/css'), this);

    // grunt/gulp
    const buildFile = this.options.buildTool === 'grunt' ? 'Gruntfile.js' : 'gulpfile.js';
    this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', `${name}-shared`, buildFile)), this.destinationPath(buildFile), this);

    // sequelize extra stuff
    if (this.options.database === 'mysql' ||
        this.options.database === 'postgresql' ||
        this.options.database === 'sqlite') {
      this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', name + suffix, `sequelize-model-index.${this.filetype}`)), this.destinationPath(`app/models/index.${this.filetype}`), this);
    }

    // thinky extra stuff
    if (this.options.database === 'rethinkdb') {
      this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', name + suffix, `thinky-model-index.${this.filetype}`)), this.destinationPath(`app/models/index.${this.filetype}`), this);
      this.fs.copyTpl(this.templatePath(path.join(__dirname, 'templates', 'extras', name + suffix, `thinky-config.${this.filetype}`)), this.destinationPath(`config/thinky.${this.filetype}`), this);
    }

    mkdirp.sync('public');
    mkdirp.sync('public/js');
    mkdirp.sync('public/css');
    mkdirp.sync('public/img');
    if (this.options.database === 'sqlite') {
      mkdirp.sync('data');
    }

    if (this.options.skipInsights) {
      insight.track(this.filetype, name, this.options.database, this.options.viewEngine, this.options.cssPreprocessor, this.options.buildTool);
    }
  }

  install() {
    if (!this.options['skip-install']) this.installDependencies({ bower: false });
  }
};
