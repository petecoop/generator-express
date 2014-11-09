var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload')<% if(options.cssPreprocessor == 'sass'){ %>,
  sass = require('gulp-ruby-sass')<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>,
  sass = require('gulp-sass')<% } %><% if(options.cssPreprocessor == 'less'){ %>,
  less = require('gulp-less')<% } %>;
<% if(options.cssPreprocessor == 'sass'){ %>
gulp.task('sass', function () {
  return gulp.src('./public/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
gulp.task('sass', function () {
  gulp.src('./public/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %><% if(options.cssPreprocessor == 'less'){ %>
gulp.task('less', function () {
  gulp.src('./public/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.less', ['less']);
});<% } %>

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js <%= options.viewEngine %>',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

gulp.task('default', [<% if(options.cssPreprocessor == 'sass'){ %>
  'sass',<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
  'sass',<% } %><% if(options.cssPreprocessor == 'less'){ %>
  'less',<% } %>
  'develop'<% if(options.cssPreprocessor == 'sass' ||
                options.cssPreprocessor == 'node-sass' ||
                options.cssPreprocessor == 'less'){ %>,
  'watch'<% } %>
]);
