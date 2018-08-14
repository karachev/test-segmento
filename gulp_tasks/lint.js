const gulp = require('gulp');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(plumber({errorHandler: errorHandler(`Error in \'lint\' task`)}))
});
