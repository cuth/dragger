var gulp = require('gulp');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var pjson = require('./package.json');

var BANNER = "\
/*  " + pjson.name + "\n\
 *  version: " + pjson.version + "\n\
 *  " + pjson.homepage + "\n\
 *  @preserve\n\
 */\n\n";
 var JSHINT_EXPORTED = "/*exported Dragger */\n\n";

var AMD_HEAD      = "define(function () {\n\n'use strict';\n\n";
var AMD_FOOT      = "\n\nreturn Dragger;\n\n});";

var COMMON_HEAD   = "'use strict';\n\n";
var COMMON_FOOT   = "\n\nmodule.exports = Dragger;";

var GLOBAL_HEAD   = "var Dragger = (function () {\n\n'use strict';\n\n";
var GLOBAL_FOOT   = "\n\nreturn Dragger;\n\n}());";


gulp.task('build-amd', function () {
    gulp.src('src/dragger.js')
        .pipe(rename('dragger.amd.js'))
        .pipe(insert.wrap(BANNER + AMD_HEAD, AMD_FOOT))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-commonjs', function () {
    gulp.src('src/dragger.js')
        .pipe(rename('dragger.common.js'))
        .pipe(insert.wrap(BANNER + COMMON_HEAD, COMMON_FOOT))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-global', function () {
    gulp.src('src/dragger.js')
        .pipe(insert.wrap(BANNER + JSHINT_EXPORTED + GLOBAL_HEAD, GLOBAL_FOOT))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-amd', 'build-commonjs', 'build-global']);

gulp.task('default', ['build']);