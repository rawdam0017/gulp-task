const { src, dest, series, watch, parallel } = require('gulp')

var globs = {
    html: 'project/*.html',
    js: 'project/js/*.js',
    css: 'project/css/**/*.css',
    img: 'project/pics/*',

}
// require
const htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');


// html task
function htmlTask() {
    // read
    return src(globs.html)
        //minify
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        // copy
        .pipe(dest('dist'))
}

exports.html = htmlTask


// js task
function jsTask() {
    return src(globs.js)
        .pipe(concat('script.main.js'))
        .pipe(terser())
        .pipe(dest('dist/assets'))
}

exports.js = jsTask


// css task
function cssTask() {
    return src(globs.css)
        .pipe(concat('style.main.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('dist/assets'))
}
exports.css = cssTask


// image task
function imgTask() {
    return src(globs.img)
        .pipe(imagemin())
        .pipe(dest('dist/images'))

}

exports.img = imgTask

// watch task
function watchTask() {
    watch(globs.html, htmlTask)
    watch(globs.css, cssTask)
    watch(globs.js, jsTask)
    watch(globs.img, imgTask)
}

exports.default = series(parallel(htmlTask, jsTask, cssTask, imgTask), watchTask)

