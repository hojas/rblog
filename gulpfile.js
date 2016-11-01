var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var assets = require('postcss-assets');
var cssnano = require('cssnano');
var colorFn = require('postcss-color-function');

gulp.task('css', function() {
    var assetsOptions = {
        basePath: './static',
        loadPaths: ['img'],
    };

    var processors = [
        autoprefixer({ browsers: ['last 2 versions'] }), // 有了这个插件，不用写浏览器前缀代码了
        cssnext, // can use new syntax now, scss like syntax and so on
        precss, // can use variables, conditionals, loops, mixins, extends... now
        assets(assetsOptions), // resolve image path
        cssnano, // minifier
        colorFn,
    ];

    return gulp.src('./static/css/app.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./static/css/dest'));
});

gulp.task('default', ['css']);

