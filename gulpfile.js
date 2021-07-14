const {src, dest, series, watch} = require('gulp')
const csso = require('gulp-csso')
const uglify = require('gulp-uglify-es').default
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cache = require('gulp-cache')
const util = require('gulp-util')
const sourcemaps = require('gulp-sourcemaps')
const isProd = util.env.production

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(isProd ? htmlmin({collapseWhitespace: true}) : util.noop())
        .pipe(dest('dist'))
}

function cssFonts() {
    return src('src/css/fonts.css')
        .pipe(!isProd ? sourcemaps.init() : util.noop())
        .pipe(isProd ? csso() : util.noop())
        .pipe(!isProd ? sourcemaps.write() : util.noop())
        .pipe(dest('dist'))
}

function css() {
    return src(['src/libs/css/**/*.css', 'src/css/**.css'])
        .pipe(!isProd ? sourcemaps.init() : util.noop())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(isProd ? csso() : util.noop())
        .pipe(concat('style.css'))
        .pipe(!isProd ? sourcemaps.write() : util.noop())
        .pipe(dest('dist'))
}

function js() {
    return src('src/js/**.js')
        .pipe(!isProd ? sourcemaps.init() : util.noop())
        .pipe(isProd ? uglify() : util.noop())
        .pipe(concat('app.js'))
        .pipe(!isProd ? sourcemaps.write() : util.noop())
        .pipe(dest('dist'))
}

function fonts() {
    return src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(dest('dist/fonts'))
}

function img() {
    return src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(dest('dist/img'))
}

function clear() {
    return (del('dist') && cache.clearAll())
}

function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/css/**.css', series(css)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, html, fonts, img, cssFonts, css, js)
exports.serve = series(clear, html, fonts, img, cssFonts, css, js, serve)
exports.clear = clear