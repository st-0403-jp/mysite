/*gulpfile.js*/

var fs = require('fs');

var gulp = require("gulp");
var clean = require('gulp-clean');
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var server = require('gulp-webserver');
var ejs = require('gulp-ejs');

var json = JSON.parse(fs.readFileSync('./json/test.json'));

gulp.task('ejs', function () {
  return gulp.src(['./src/ejs/*.ejs'])
    .pipe(ejs(json, {ext: '.html'}))
    /*
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    */
    .pipe(gulp.dest('./model'));
});

gulp.task('less', function () {
  return gulp.src(['./src/less/*.less']).pipe(gulp.dest('./model/css'));
});

gulp.task('watch', function() {
  return gulp.watch('./src/ejs/*.ejs', ['ejs']);
});

gulp.task('serve', ['ejs', 'less'], function () {
  gulp.watch('./src/ejs/*.ejs', ['ejs']);
  gulp.watch('./src/less/*.less', ['less']);
  gulp.src('./model')
    .pipe(server({
      host: '0.0.0.0',
      port: 8888,
      livereload: true,
      open: true
    }));
});

gulp.task('clean', function () {
  return gulp.src('./dist/*')
    .pipe(clean());
});
gulp.task('build', ['clean'], function () {
  //'copy'
  gulp.src(['./src/ejs/*.ejs'])
    .pipe(ejs(json, {ext: '.html'}))
    /*
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    */
    .pipe(gulp.dest('./dist/doc'));

  gulp.src(['./model/css/*.css', './model/js/*.js', 'model/bower_components/sanitize-css/sanitize.css', 'model/img/*'], {base: 'model'}).pipe(gulp.dest('./dist/doc'));
  /*
  //uglify
  gulp.src('./model/js/*.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist/js'));
  */
});

gulp.task('default', ['']);
