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

/**
  * @description
  * extJs: .js or .min.js
  * toYear: マルシー日付
  * skillList: スキルセット
  * updateList: お知らせ
  */
var ejsData = {};

/**
  * マルシー日付
  * 年が変わって修正していたら
  * @year: String
  */
ejsData['toYear'] = {
  year: '2017'
};

/**
  * スキルセット
  * 9件+1件
  * @circle個数
  * 1: 26px, 2: 52px, 3: 78px, 4: 104px, 5: 130px
  */
ejsData['skillList'] = [
  {skill: 'HTML5', circleWidth: '130'},
  {skill: 'CSS3', circleWidth:'130'},
  {skill: 'JavaScript', circleWidth: '130'},
  {skill: 'Gulp', circleWidth: '104'},
  {skill: 'LESS', circleWidth: '78'},
  {skill: 'FontAwesome', circleWidth: '78'},
  {skill: 'Handlebars', circleWidth: '78'},
  {skill: 'EJS', circleWidth: '78'},
  {skill: 'NodeJS', circleWidth: '52'},
  {skill: 'Backbone', circleWidth: '26'},
  {skill: 'Git, Google Apps, Evernote, Trello ...', circleWidth: ''}
];
/**
  * お知らせ
  * 3件まで
  */
ejsData['updateList'] = [
  {
    dt: '2017.01.03',
    dd: '日本語をメインに戻した。'
  },
  {
    dt: '2016.12.16',
    dd: 'クロスブラウザ対応。'
  },
  {
    dt: '2016.12.07',
    dd: 'お知らせ機能を追加。'
  }
];
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
  return gulp.src(['src/ejs/*.ejs'], {base: 'src/ejs'})
    .pipe(ejs(ejsData, {ext: '.html'}))
    .pipe(gulp.dest('mock'));
});

gulp.task('lib', function () {
  return gulp.src(['src/lib/*'])
    .pipe(gulp.dest('mock/lib'));
});

gulp.task('fonts', function () {
  return gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('mock/fonts'));
});

gulp.task('less', ['fonts'], function () {
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

gulp.task('serve', ['ejs', 'less', 'js', 'img', 'lib'], function () {
  gulp.watch(['src/ejs/*.ejs', 'src/less/*.less', 'src/js/*.js'], ['ejs', 'less', 'js']);
  gulp.watch(['src/ejs/includes/profile/*.ejs'], ['ejs']);
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

gulp.task('build', function () {

  // ejs
  ejsData['extJs'] = '.min.js';
  gulp.src(['src/ejs/*.ejs'], {base: 'src/ejs'})
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
  gulp.src(['src/lib/*'])
    .pipe(gulp.dest('dist/lib'));

  // fonts
  gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));

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
