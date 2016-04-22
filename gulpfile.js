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
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var json = JSON.parse(fs.readFileSync('./json/test.json'));

/*
 * {buffer: true, read: true, base: ''} gulp.src options dfault
 */

gulp.task('ejs', function () {
  return gulp.src(['src/ejs/*.ejs'])
    .pipe(ejs(json, {ext: '.html'}))
    .pipe(gulp.dest('model'));
});

gulp.task('less', function () {
  return gulp.src(['src/less/*.less']).pipe(gulp.dest('model/css'));
});

gulp.task('js', function () {
  return gulp.src(['src/js/*.js']).pipe(gulp.dest('model/js'));
});

gulp.task('img', function () {
  return gulp.src(['src/img/*.jpg', 'src/img/*.png']).pipe(imagemin({progressive: true}, {use: [pngquant()]})).pipe(gulp.dest('model/img'));
});

gulp.task('clean', function () {
  return gulp.src('./dist/*')
    .pipe(clean());
});

gulp.task('serve', ['ejs', 'less', 'js', 'img'], function () {
  gulp.watch(['src/ejs/*.ejs', 'src/less/*.less', 'src/js/*.js', 'src/img/*.(jpg | png)'], ['ejs', 'less', 'js', 'img']);
  gulp.src('model')
    .pipe(server({
      host: '0.0.0.0',
      port: 8888,
      livereload: true,
      open: true
    }));
});

gulp.task('build', ['clean'], function () {
  //'copy'
  gulp.src(['./src/ejs/*.ejs'])
    .pipe(ejs(json, {ext: '.html'}))
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

gulp.task('default', function () {
  console.log(gulp.task);
});
