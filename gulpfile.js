const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const browsersync = require('browser-sync');

function cleanDist() {
    return src('./dist', {read: false}).pipe(clean())
}

function copyHtml() {
    return src('./src/index.html').pipe(dest('./dist'))
}

function copyJs() {
    const paths = './src/**/*.js'
    return src(paths)
    .pipe(concat('app.js'))
    .pipe(dest('./dist'))
}

function copyVendorJs() {
    const paths = 'node_modules/jquery/dist/jquery.min.js'
    return src(paths)
    .pipe(concat('vendor.js'))
    .pipe(dest('./dist'))
}

function copyCss() {
    return src('./src/styles.css').pipe(dest('./dist'))
}

function copyVendorCss() {
    const paths = ['./src/vendor/**/*.css'];
    return src(paths)
    .pipe(concat('vendor.css'))
    .pipe(dest('./dist'))
}

function server(cb) {
    browsersync.init({
        server: {
            baseDir: './dist',
        },
    });

    watch('./src/**/*.js', series(copyVendorJs, copyJs, reloadBrowser));
    watch('./src/**/*.css', series(copyVendorJs, copyCss, reloadBrowser));
    watch('./src/index.html', series(copyHtml));
    cb();
}

function reloadBrowser(cb) {
    browsersync.reload();
    cb();
}


module.exports = {
    build: series(cleanDist, parallel(copyJs, copyVendorJs, copyHtml, copyCss, copyVendorCss)),
    serve: series(
        cleanDist,
        parallel(copyJs, copyVendorJs , copyHtml, copyCss, copyVendorCss), 
        server
    ),
}