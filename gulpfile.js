/*gulpfile.js*/

var gulp = require("gulp");
var clean = require('gulp-clean');
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var server = require('gulp-webserver');

gulp.task('watch', function() {
  gulp.watch('./model');
});

gulp.task('serve', function() {
  gulp.src('./model')
    .pipe(server({
      host: '10.17.208.153',
      port: 8080,
      livereload: true,
      open: true
    }));
});

gulp.task('clean', function() {
  return gulp.src('./dist/*')
    .pipe(clean());
});
gulp.task('build', ['clean'], function () {
  //'copy'
  gulp.src('./asset/*.html')
    .pipe(gulp.dest('./dist'));
  //uglify
  gulp.src('./asset/js/*.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['']);
