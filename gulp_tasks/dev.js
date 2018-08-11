const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('dev', () => (
  runSequence(
    'lint',
    'scripts',
    'svg-icons',
    'styles',
    'copy',
    'template',
    'serve',
    'watch'
  )
));
