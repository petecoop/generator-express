'use strict';

const request = require('request');

module.exports = (grunt) => {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  const reloadPort = 35729;
  let files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },<% if(options.cssPreprocessor == 'sass'){ %>
    sass: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.scss'
        }
      }
    },<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
    sass: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.scss'
        }
      }
    },<% } %><% if(options.cssPreprocessor == 'less'){ %>
    less: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.less'
        }
      }
    },<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
    stylus: {
      dist: {
        files: {
          'public/css/style.css': 'public/css/style.styl'
        }
      }
    },<% } %>
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.<%= filetype %>',
          'app/**/*.<%= filetype %>',
          'config/*.<%= filetype %>'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [<% if(options.cssPreprocessor == 'none'){ %>
          'public/css/*.css'<% } %><% if(options.cssPreprocessor == 'sass'){ %>
          'public/css/*.scss'<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
          'public/css/*.scss'<% } %><% if(options.cssPreprocessor == 'less'){ %>
          'public/css/*.less'<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
          'public/css/*.styl'<% } %>
        ],<% if(options.cssPreprocessor == 'sass'){ %>
        tasks: ['sass'],<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
        tasks: ['sass'],<% } %><% if(options.cssPreprocessor == 'less'){ %>
        tasks: ['less'],<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
        tasks: ['stylus'],<% } %>
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/*.<%= options.viewEngine %>',
          'app/views/**/*.<%= options.viewEngine %>'
        ],
        options: { livereload: reloadPort }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', () => {
    const done = this.async();
    setTimeout(() => {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), (err, res) => {
          const reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [<% if(options.cssPreprocessor == 'sass'){ %>
    'sass',<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
    'sass',<% } %><% if(options.cssPreprocessor == 'less'){ %>
    'less',<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
    'stylus',<% } %>
    'develop',
    'watch'
  ]);
};
