"use strict";

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-cssnano');

var paths = {
  build: "dist/",
  html: [
    'index.html'
  ],
  js: [
    'password-generator.js'
  ],
  js_vendors: [
    'node_modules/lesspass/dist/lesspass.min.js',
    'node_modules/clipboard/dist/clipboard.min.js'
  ],
  styles: [
    'style.css'
  ],
  styles_vendors: [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/hint.css/hint.min.css'
  ],
  images: [
    'images/**/*'
  ],
  fonts: [
    'node_modules/font-awesome/fonts/**/*'
  ]
};

gulp.task('clean', function (callback) {
  return del(paths.build, {force: true}, callback);
});

gulp.task('fonts', [], function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts/'));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + 'images/'));
});

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.build));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.build + '/styles'));
});

gulp.task('styles_vendors', function () {
  return gulp.src(paths.styles_vendors)
    .pipe(gulp.dest(paths.build + 'styles/'));
});

gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.build + 'js/'));
});

gulp.task('js_vendors', function () {
  return gulp.src(paths.js_vendors)
    .pipe(gulp.dest(paths.build + 'js/'));
});

gulp.task('build', ['clean'], function () {
  gulp.start('js', 'js_vendors', 'html', 'styles', 'styles_vendors', 'fonts', 'images');
});

gulp.task('watch', ['build'], function () {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.js_vendors, ['js_vendors']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.styles_vendors, ['styles_vendors']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.fonts, ['fonts']);
});

gulp.task('default', ['watch'], function () {

});