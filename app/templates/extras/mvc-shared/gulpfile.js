const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');<% if(options.cssPreprocessor == 'sass'){ %>
const sass = require('gulp-ruby-sass');<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
const sass = require('gulp-sass');<% } %><% if(options.cssPreprocessor == 'less'){ %>
const less = require('gulp-less');<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
const stylus = require('gulp-stylus');<% } %>
<% if(options.cssPreprocessor == 'sass'){ %>
gulp.task('sass', () => {
  return sass('./public/css/**/*.scss')
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %><% if(options.cssPreprocessor == 'node-sass'){ %>
gulp.task('sass', () => {
  gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./public/css/*.scss', ['sass']);
});<% } %><% if(options.cssPreprocessor == 'less'){ %>
gulp.task('less', () => {
  gulp.src('./public/css/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./public/css/*.less', ['less']);
});<% } %><% if(options.cssPreprocessor == 'stylus'){ %>
gulp.task('stylus', () => {
  gulp.src('./public/css/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./public/css/*.styl', ['stylus']);
});<% } %>

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee <%= options.viewEngine %>',<% if(options.viewEngine == 'marko'){ %>
    ignore: '*.marko.js',<% } %>
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
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
