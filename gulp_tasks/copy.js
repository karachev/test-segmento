const gulp = require('gulp');
const changed = require('gulp-changed');

gulp.task('copy', () => (
  gulp.src('src/resources/**/*')
    .pipe(changed('build/resources'))
    .pipe(gulp.dest('build/resources'))
));

gulp.task('copy:to-web-folder', () => (
  gulp.src(['build/**/*', '!build/**/*.html'])
    .pipe(gulp.dest('../web/build'))
));
