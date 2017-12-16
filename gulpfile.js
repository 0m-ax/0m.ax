'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const ejs = require("gulp-ejs");
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const webpack = require('gulp-webpack');
const named = require('vinyl-named');
const fs = require('fs')
const critical = require('critical');
const cleanCSS = require('gulp-clean-css');
const gulpSequence = require('gulp-sequence')

//process html
gulp.task('html', function () {
  let criticalCss = ''
  try{
    criticalCss = fs.readFileSync('./dist/css/critical.css')
  }
  catch (error){

  }
  return gulp.src('./src/*.ejs')
    .pipe(ejs({
      appData:require('./appdata.json'),
      critical:criticalCss
    },{},{ext:'.html'}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html:watch', function () {
  gulp.watch('./src/**/*.ejs', ['html', ()=>{
    browserSync.reload();
  }]);
});
gulp.task('critical:gen', function (cb) {
  critical.generate({
    base: 'dist/',
    src: 'index.html',
    css: ['dist/css/index.css'],
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    dest: 'css/critical.css',
    minify: true,
    extract: false,
    ignore: ['font-face']
  },function(err,resp){
    cb()
  });
});
//process sass
gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});
gulp.task('sass:prod', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'))
});
gulp.task('css',gulpSequence('sass','critical:gen','html'))
gulp.task('css:prod',gulpSequence('sass:prod','html','critical:gen','html'))
gulp.task('css:watch', function () {
  gulp.watch('./src/css/**/*.scss', ['css']);
});
//process images
gulp.task('image', function () {
  return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('image:watch', function () {
  gulp.watch('./src/img/*', ['image', (done)=>{
    browserSync.reload();
    done();
  }]);
});

//process javascript
gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      "presets": ["env"]
    }))
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./src/js/*.js', ['js', (done)=>{
    browserSync.reload();
  }]);
});

gulp.task('generate-service-worker', function(callback) {
  var swPrecache = require('sw-precache');
  var rootDir = 'dist';
  console.log('!'+rootDir + '/css/critical.css')
  swPrecache.write(`${rootDir}/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}','!'+rootDir + '/css/critical.css'],
    stripPrefix: rootDir
  }, callback);
});
gulp.task('generate-service-worker:watch',function (){
  gulp.watch('dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}', ['generate-service-worker', (done)=>{
    browserSync.reload();
  }]);
})
//process fonts
gulp.task('fonts', function () {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('fonts:watch', function () {
  gulp.watch('./src/fonts/**', ['fonts', (done)=>{
    browserSync.reload();
  }]);
});

gulp.task('manifest',function (){
  return gulp.src('./src/manifest.json')
  .pipe(gulp.dest('./dist/'));
})
gulp.task('manifest:watch', function () {
  gulp.watch('./src/manifest.json', ['manifest', (done)=>{
    browserSync.reload();
  }]);
});

//serve
gulp.task('serve', function () {
  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  });
});

gulp.task('watch',['css:watch','image:watch','js:watch','html:watch','fonts:watch','manifest:watch','generate-service-worker:watch'])
gulp.task('process',['css','image','js','html','fonts','manifest','generate-service-worker'])
gulp.task('production',gulpSequence(['css:prod','image','js','html','fonts','manifest'],'generate-service-worker'))
gulp.task('default',['serve','process','watch'])