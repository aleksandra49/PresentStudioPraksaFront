const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-csso');

// Compile SCSS to CSS
gulp.task('compile-sass', function () {
  return gulp
    .src('stil.scss') 
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    //.pipe(gulp.dest('./'));
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('dist/css/*.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('dist/css'));
  });

// Watch for changes in SCSS files
gulp.task('watch', function () {
  gulp.watch('stil.scss', gulp.series('compile-sass')); 
});

// Default task
gulp.task('default', gulp.series('compile-sass', 'watch'));

gulp.task('build-css', gulp.series('compile-sass'));
// Kombinacija zadataka
//gulp.task('build-css', gulp.series('compile-sass', 'minify-css'));

//gulp.task('build-css', gulp.series('sass', 'minify-css'));
