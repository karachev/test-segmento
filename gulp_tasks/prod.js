const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('prod', () => (
  runSequence(
    'lint',
    'scripts:prod',
    'watch:prod'
  )
));
