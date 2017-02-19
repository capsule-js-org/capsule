/*
 * Copyright (c) 2017 - present Daniel Ennis (Aikar) - MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  "Software"), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:
 *
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const gulp = require('gulp');
require('gulp-bash-completion')(gulp);
const babel = require('gulp-babel');
const flow = require('gulp-flowtype');
const umd = require('gulp-umd');
const sourcemaps = require('gulp-sourcemaps');
const scripts = 'src/**/*.js';
gulp.task('build', () => {
  return gulp.src(scripts, {base: 'src'})
    .pipe(sourcemaps.init())
    .pipe(flow({
      all: false,
      weak: false,
      killFlow: true,
      beep: true,
      abort: true,
    }))
    .pipe(babel())
    .pipe(umd())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

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
