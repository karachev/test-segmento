const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('img-optimize', () => (
  gulp.src('src/resources/img/*/**')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('build/resources/img/'))
));
