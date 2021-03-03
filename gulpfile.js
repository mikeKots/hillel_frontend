const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');

function cleanDist() {
    return src('./dist', {read: false}).pipe(clean())
}

function copyHtml() {
    return src('./src/index.html').pipe(dest('./dist'))
}

function copyJs() {
    const paths = ['./src/mvc/**/*.js', './src/*.js']
    return src(paths)
    .pipe(concat('app.js'))
    .pipe(dest('./dist'))
}

function copyCss() {
    return src('./src/styles.css').pipe(dest('./dist'))
}

function copyVendorCss() {
    const paths = ['node_modules/normalize.css/normalize.css', 'node_modules/skeleton.css/skeleton.css', './src/vendor/**/*.css'];
    return src(paths)
    .pipe(concat('vendor.css'))
    .pipe(dest('./dist'))
}

function watchFiles() {
    watch('./src/**/*.js', {events:'all'}, copyJs)
}

module.exports = {
    build: series(cleanDist, parallel(copyJs, copyHtml, copyCss, copyVendorCss)),
    serve: series(
        cleanDist,
        parallel(copyJs, copyHtml, copyCss, copyVendorCss), 
        watchFiles
    ),
}