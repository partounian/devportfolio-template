var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('serve', ['js', 'styles'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("js/scripts.js", ['js-watch']);
    gulp.watch("scss/styles.scss", ['styles']);
});

gulp.task('js', function() {
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
});

gulp.task('js-watch', ['js'], function(done) {
    browserSync.reload();
    done();
})

gulp.task('styles', function() {
    return gulp.src('scss/styles.scss')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['js', 'styles'], function() {
    gulp.watch('js/*.js', ['js']);
    gulp.watch('scss/*.scss', ['styles']);
});

gulp.task('default', ['serve']);
