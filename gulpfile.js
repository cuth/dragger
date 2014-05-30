var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var uglify_options = {
    preserveComments: 'some'
};

gulp.task('build-amd', function () {
    gulp.src(['src/banner.js', 'src/header.amd.js', 'src/Dragger.js', 'src/footer.amd.js'])
        .pipe(concat('Dragger.amd.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('Dragger.amd.min.js'))
        .pipe(uglify(uglify_options))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-commonjs', function () {
    gulp.src(['src/banner.js', 'src/header.common.js', 'src/Dragger.js', 'src/footer.common.js'])
        .pipe(concat('Dragger.common.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('Dragger.common.min.js'))
        .pipe(uglify(uglify_options))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-global', function () {
    gulp.src(['src/banner.js', 'src/header.global.js', 'src/Dragger.js', 'src/footer.global.js'])
        .pipe(concat('Dragger.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('Dragger.min.js'))
        .pipe(uglify(uglify_options))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-amd', 'build-commonjs', 'build-global']);

gulp.task('build-amd-jquery', function () {
    gulp.src(['src/jquery.banner.js', 'src/jquery.header.amd.js', 'src/jquery.Dragger.js', 'src/jquery.footer.amd.js'])
        .pipe(concat('jquery.Dragger.amd.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('jquery.Dragger.amd.min.js'))
        .pipe(uglify(uglify_options))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-commonjs-jquery', function () {
    gulp.src(['src/jquery.banner.js', 'src/jquery.header.common.js', 'src/jquery.Dragger.js', 'src/jquery.footer.common.js'])
        .pipe(concat('jquery.Dragger.common.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('jquery.Dragger.common.min.js'))
        .pipe(uglify(uglify_options))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-global-jquery', function () {
    gulp.src(['src/jquery.banner.js', 'src/jquery.header.global.js', 'src/jquery.Dragger.js', 'src/jquery.footer.global.js'])
        .pipe(concat('jquery.Dragger.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('jquery.Dragger.min.js'))
        .pipe(uglify(uglify_options))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-jquery', ['build-amd-jquery', 'build-commonjs-jquery', 'build-global-jquery']);

gulp.task('default', ['build', 'build-jquery']);