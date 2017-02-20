/*
 * @flow
 * Copyright (c) 2017 Daniel Ennis (Aikar) - MIT License - http://opensource.org/licenses/MIT
 */

const gulp = require('gulp');
require('gulp-bash-completion')(gulp);
const babel = require('gulp-babel');
const license = require('gulp-license-check');
const flow = require('gulp-flowtype');
const umd = require('gulp-umd');
const sourcemaps = require('gulp-sourcemaps');
const scripts = 'src/**/*.js';

gulp.task('build', () => {
  return gulp.src(scripts, {base: 'src'})
    .pipe(license({
      path: '.license-header',
      blocking: false,
      logInfo: false,
      logError: true
    }))
    .pipe(flow({
      all: false,
      weak: false,
      beep: true,
      abort: true,
    }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(umd())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('prepublish', ['build']);

gulp.task('default', ['build'], () => {
  require('gulp-watch')(scripts, () => scheduleTask('build'));
});

// =====================
const scheduledTasks = {};
function scheduleTask(task, time) {
  if (scheduledTasks[task]) {
    clearTimeout(scheduledTasks[task]);
  }
  scheduledTasks[task] = setTimeout(function () {
    delete scheduledTasks[task];
    gulp.start(task);
  }, time);
}
