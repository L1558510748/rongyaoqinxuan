const gulp = require("gulp");//gulp
const clean = require("gulp-clean");//删除文件
const cssmin = require("gulp-cssmin");//压缩css
const uglify = require("gulp-uglify");//压缩js
const balel = require("gulp-babel");//es6转es5
const htmlmin = require("gulp-htmlmin");//压缩html
const autoprefixer = require("gulp-autoprefixer");//兼容
const webserver = require("gulp-webserver");//服务器
const sass=require("gulp-sass-china");//sass

function testFn() {
    console.log("test");
}
exports.test = testFn;
function cleanFn() {
    return gulp.src("./dist")
        .pipe(clean())
}
exports.clean = cleanFn;
function cssminFn() {
    return gulp.src("./src/css/**")
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"));
}
exports.cssmin = cssminFn;
function jsFn() {
    return gulp.src("./src/js/**")
        .pipe(balel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
}
exports.js = jsFn;
function htmlFn() {
    return gulp.src("./src/html/**")
        .pipe(htmlmin({
            removeEmptyAttributes: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./dist/html"))
}
exports.html = htmlFn;
function staticFn() {
    return gulp.src("./src/static/**")
        .pipe(gulp.dest("./dist/static"))
}
exports.static = staticFn;

function sassFn() {
    return gulp.src("./src/sass/**")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"))
  }
exports.sass=sassFn;
function serverFn() {
    return gulp.src("./dist")
    .pipe(webserver({
        host:"localhost",
        port:3000,
        livereload:true,
        open:"./html/index.html",
        proxies:[{
            source:"./chapters",
            target:"https://wanandroid.com/wxarticle/chapters/json"
        }]
    }))
}
exports.server=serverFn;
function watchFn() {
    gulp.watch("./src/css/**",cssminFn);
    gulp.watch("./src/js/**",jsFn);
    gulp.watch("./src/html/**",htmlFn);
    gulp.watch("./src/static/**",staticFn);
    gulp.watch("./src/sass/**",sassFn);
  }
  exports.watch=watchFn;
  exports.all=gulp.series(
      gulp.parallel(cssminFn,jsFn,htmlFn,staticFn,sassFn),
      gulp.parallel(serverFn,watchFn)
  )