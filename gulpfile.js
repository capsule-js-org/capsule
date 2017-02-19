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
