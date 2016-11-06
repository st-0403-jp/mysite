/*gulpfile.js*/

var fs = require('fs');

var gulp = require("gulp");
var clean = require('gulp-clean');
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require('gulp-uglify');
var minicss = require('gulp-minify-css');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var server = require('gulp-webserver');
var ejs = require('gulp-ejs');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var less = require('gulp-less');

var json = JSON.parse(fs.readFileSync('./json/test.json'));

var ejsData = {};

/*
 * {buffer: true, read: true, base: ''} gulp.src options dfault
 */
/*
var src = {};
fs.readdir('src/', function (err, files) {
  if (err) {
    return false;
  }
  // src
  files.filter(function (dir) {
    return (fs.statSync('src/' + dir).isDirectory());
  }).forEach(function (dir) {
    console.log(dir);
  });
});

//console.log(src);
setTimeout(function () {
  console.log(src);
}, 50);
*/
gulp.task('ejs', function () {
  ejsData['extJs'] = '.js';
  return gulp.src(['src/ejs/*.ejs', 'src/ejs/api/mysite/profile/*.ejs'], {base: 'src/ejs'})
    .pipe(ejs(ejsData, {ext: '.html'}))
    .pipe(gulp.dest('mock'));
});

gulp.task('cssLib', function () {
  return gulp.src(['src/less/lib/*.css', 'src/less/fonts/*'], {base: 'src/less'})
    .pipe(gulp.dest('mock/css'));
});

gulp.task('less', ['cssLib'], function () {
  return gulp.src(['src/less/*.less'])
    .pipe(less())
    .pipe(gulp.dest('mock/css'));
});

gulp.task('js', function () {
  return gulp.src(['src/js/*.js']).pipe(gulp.dest('mock/js'));
});

gulp.task('img', function () {
  return gulp.src(['src/img/*.jpg', 'src/img/*.png']).pipe(gulp.dest('mock/img'));
});

gulp.task('serve', ['ejs', 'less', 'js', 'img'], function () {
  gulp.watch(['src/ejs/*.ejs', 'src/less/*.less', 'src/js/*.js'], ['ejs', 'less', 'js']);
  gulp.watch(['src/ejs/api/mysite/profile/*.ejs'], ['ejs']);
  gulp.watch(['src/img/*.jpg', 'src/img/*.png'], ['img']);
  gulp.src('mock')
    .pipe(server({
      host: '0.0.0.0',
      port: 8888,
      livereload: true,
      open: true
    }));
});

gulp.task('cleanMock', function () {
  return gulp.src('mock/*')
    .pipe(clean());
});

gulp.task('cleanDist', function () {
  return gulp.src('dist/*')
    .pipe(clean());
});

gulp.task('buildEjs', function () {
  return gulp.src(['src/ejs/*.ejs', 'src/ejs/tmp/profile/*.ejs'], {base: 'src/ejs'})
    .pipe(ejs(null, {ext: '.html'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['cleanDist'], function () {

  // ejs
  ejsData['extJs'] = '.min.js';
  gulp.src(['src/ejs/*.ejs', 'src/ejs/api/mysite/profile/*.ejs'], {base: 'src/ejs'})
    .pipe(ejs(ejsData, {ext: '.html'}))
    .pipe(gulp.dest('dist'));

  // img
  gulp.src(['src/img/*.jpg', 'src/img/*.png'])
    .pipe(gulp.dest('dist/img'));

  // css
  gulp.src(['src/less/*.less'])
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
    .pipe(minicss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('dist/css'));

  // lib
  gulp.src(['src/less/lib/*.css'])
    .pipe(gulp.dest('dist/css/lib'));

  // fonts
  gulp.src(['src/less/fonts/*'])
    .pipe(gulp.dest('dist/css/fonts'));

  // js
  gulp.src(['src/js/*.js'])
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('distServe', function () {
  gulp.src('dist')
    .pipe(server({
      host: '0.0.0.0',
      port: 8808,
      livereload: false,
      open: true
    }));
});

gulp.task('default', function () {
  console.log(gulp.task);
});
