const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");

gulp.task('svg-icons', () => {
  return gulp.src('src/icons/**/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          inline: true,
          prefix: '.ui-Icon_%s .ui-Icon-Image',
          dest: '',
          dimensions: '%s',
          sprite: 'sprite.svg',
          render: {
            css: true
          },
          example: true
        }
      },
      svg: {
        namespaceClassnames: false
      }
    }))
    .pipe(gulp.dest("build/resources/icons"))
});
