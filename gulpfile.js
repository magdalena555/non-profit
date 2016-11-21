var gulp   = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    imageMin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

gulp.task('bs', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('styles', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('scripts', function () {
  return gulp.src('./assets/javascript/scripts.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/javascript'))
    .pipe(reload({stream:true}));
});

gulp.task('images', function () {
  return gulp.src('./assets/images/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./assets/images'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('./assets/sass/**/*.scss', ['styles']);
  gulp.watch('./assets/js/**/*.js', ['scripts']);
  gulp.watch('./*.html', reload);
});

gulp.task('default', ['styles', 'scripts', 'images', 'bs', 'watch']);