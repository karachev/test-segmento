const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', () => (
  runSequence(
    'lint',
    'scripts',
    'styles',
    'copy',
    'img-optimize',
    'watch'
  )
));
