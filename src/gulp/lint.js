(function(){
  'use strict';

  var gulp = require('gulp');
  var eslint = require('gulp-eslint');
  var jscs = require('gulp-jscs');

  gulp.task('lint', ['eslint', 'jscs']);

  var paths = [
    __dirname  +'/../../src/**/*.js'
  ];

  // rules set in .eslintrc
  gulp.task('eslint', function() {
    return gulp
      .src(paths)
      .pipe(eslint())
      .pipe(eslint.formatEach('compact', process.stderr))
      .pipe(eslint.failOnError());
  });

  gulp.task('jscs', function() {
    return gulp
      .src(paths)
      .pipe(jscs());
  });
}());
