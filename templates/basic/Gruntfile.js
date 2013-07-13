module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: { nospawn: true },
      server: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/javascripts/*.js'],
        options: { livereload: true},
      },
      css: {
        files: ['public/stylesheets/*.css'],
        options: { livereload: true},
      },
      jade: {
        files: ['views/*.jade'],
        options: { livereload: true},
      }
    }
  });

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    // This is a temporarily solution until https://github.com/edwardhotchkiss/grunt-develop/pull/9
    // gets merged into grunt-develop.  Once that happens we can more accurately bind to the restart
    // of the node server and get rid of this timeout and delayed-livereload altogether.
    var done = this.async();
    setTimeout(function () {
      require('request').get("http://localhost:35729/changed?files=app.js",  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['develop', 'watch']);
};
