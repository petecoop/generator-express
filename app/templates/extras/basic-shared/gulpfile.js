var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload')<% if(options.cssPreprocessor == 'sass'){ %>,
  sass = require('gulp-ruby-sass')<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>,
  sass = require('gulp-sass')<% } %><% if(options.cssPreprocessor == 'less'){ %>,
  less = require('gulp-less')<% } %><% if(options.cssPreprocessor == 'stylus'){ %>,
  stylus = require('gulp-stylus')<% } %>;
<% if(options.cssPreprocessor == 'sass'){ %>
gulp.task('sass', function () {
  return sass('./public/css/**/*.scss')
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
gulp.task('sass', function () {
  gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %><% if(options.cssPreprocessor == 'less'){ %>
gulp.task('less', function () {
  gulp.src('./public/css/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.less', ['less']);
});<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
gulp.task('stylus', function () {
  gulp.src('./public/css/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.styl', ['stylus']);
});<% } %>

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js <%= options.viewEngine %> coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [<% if(options.cssPreprocessor == 'sass'){ %>
  'sass',<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
  'sass',<% } %><% if(options.cssPreprocessor == 'less'){ %>
  'less',<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
  'stylus',<% } %>
  'develop'<% if(options.cssPreprocessor == 'sass' ||
                options.cssPreprocessor == 'node-sass' ||
                options.cssPreprocessor == 'less' ||
                options.cssPreprocessor == 'stylus'){ %>,
  'watch'<% } %>
]);
