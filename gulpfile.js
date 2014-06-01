var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var pjson = require('./package.json');

var BANNER = "\
/*  " + pjson.name + "\n\
 *  version: " + pjson.version + "\n\
 *  " + pjson.homepage + "\n\
 *  @preserve\n\
 */\n";
 var JSHINT_EXPORTED = "\n/*exported Dragger */\n\n";

var AMD_HEAD      = "define(function () {\n    'use strict';\n\n";
var AMD_FOOT      = "\n\n});";
var AMD_$_HEAD    = "define(['jquery'], function ($) {\n    'use strict';\n\n";
var AMD_$_FOOT    = AMD_FOOT;

var COMMON_HEAD   = "module.exports = (function () {\n    'use strict';\n\n";
var COMMON_FOOT   = "\n\n}());";
var COMMON_$_HEAD = "module.exports = (function ($) {\n    'use strict';\n\n";
var COMMON_$_FOOT = "\n\n}(require('jquery')));";

var GLOBAL_HEAD   = "var Dragger = (function () {\n    'use strict';\n\n";
var GLOBAL_FOOT   = COMMON_FOOT;
var GLOBAL_$_HEAD = "var Dragger = (function ($) {\n    'use strict';\n\n";
var GLOBAL_$_FOOT = "\n\n}(jQuery || Zepto || ender || $));";

var UGLIFY_OPTIONS = {
    preserveComments: 'some'
};

gulp.task('build-amd', function () {
    gulp.src('src/Dragger.js')
        .pipe(rename('Dragger.amd.js'))
        .pipe(insert.wrap(BANNER + AMD_HEAD, AMD_FOOT))
        .pipe(gulp.dest('dist'))
        .pipe(rename('Dragger.amd.min.js'))
        .pipe(uglify(UGLIFY_OPTIONS))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-commonjs', function () {
    gulp.src('src/Dragger.js')
        .pipe(rename('Dragger.common.js'))
        .pipe(insert.wrap(BANNER + COMMON_HEAD, COMMON_FOOT))
        .pipe(gulp.dest('dist'))
        .pipe(rename('Dragger.common.min.js'))
        .pipe(uglify(UGLIFY_OPTIONS))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-global', function () {
    gulp.src('src/Dragger.js')
        .pipe(insert.wrap(BANNER + JSHINT_EXPORTED + GLOBAL_HEAD, GLOBAL_FOOT))
        .pipe(gulp.dest('dist'))
        .pipe(rename('Dragger.min.js'))
        .pipe(uglify(UGLIFY_OPTIONS))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-amd', 'build-commonjs', 'build-global']);

gulp.task('build-amd-jquery', function () {
    gulp.src('src/jquery.Dragger.js')
        .pipe(rename('jquery.Dragger.amd.js'))
        .pipe(insert.wrap(BANNER + AMD_$_HEAD, AMD_$_FOOT))
        .pipe(gulp.dest('dist'))
        .pipe(rename('jquery.Dragger.amd.min.js'))
        .pipe(uglify(UGLIFY_OPTIONS))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-commonjs-jquery', function () {
    gulp.src('src/jquery.Dragger.js')
        .pipe(rename('jquery.Dragger.common.js'))
        .pipe(insert.wrap(BANNER + COMMON_$_HEAD, COMMON_$_FOOT))
        .pipe(gulp.dest('dist'))
        .pipe(rename('jquery.Dragger.common.min.js'))
        .pipe(uglify(UGLIFY_OPTIONS))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-global-jquery', function () {
    gulp.src('src/jquery.Dragger.js')
        .pipe(insert.wrap(BANNER + JSHINT_EXPORTED + GLOBAL_$_HEAD, GLOBAL_$_FOOT))
        .pipe(gulp.dest('dist'))
        .pipe(rename('jquery.Dragger.min.js'))
        .pipe(uglify(UGLIFY_OPTIONS))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-jquery', ['build-amd-jquery', 'build-commonjs-jquery', 'build-global-jquery']);

gulp.task('default', ['build', 'build-jquery']);