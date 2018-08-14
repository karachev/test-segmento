const gulp = require('gulp');

const paths = {
  styles: ['src/css/**/*'],
  resources: ['src/resources/**/*'],
  scripts: ['src/js/**/*'],
  templates: ['src/templates/**/*'],
  jsonData: ['src/data/**/*']
};

gulp.task('watch', () => {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.resources, ['copy']);
  gulp.watch(paths.scripts, ['lint', 'scripts']);
  gulp.watch(paths.templates, ['template']);
  gulp.watch(paths.jsonData, ['template']);
});

gulp.task('watch:prod', () => {
  gulp.watch(paths.scripts, ['scripts:prod'])
})
