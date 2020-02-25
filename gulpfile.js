var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	header  = require('gulp-header'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	package = require('./package.json');

var banner = [
	'/*!\n' +
	' * <%= package.name %>\n' +
	' * <%= package.title %>\n' +
	' * <%= package.url %>\n' +
	' * @author <%= package.author %>\n' +
	' * @version <%= package.version %>\n' +
	' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
	' */',
	'\n'
].join('');

var cssFiles = [
		'src/scss/style.scss'
	],
	cssDest = 'assets/css';

gulp.task('css', function () {
	return gulp.src(cssFiles)
		.pipe(sourcemaps.init())
		.pipe(sass({errLogToConsole: true}))
		.pipe(autoprefixer('last 4 version'))
		.pipe(gulp.dest(cssDest))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(header(banner, { package : package }))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(cssDest))
		.pipe(browserSync.reload({stream:true}));
});

var jsFiles = [
		'src/js/vendors/*.js',
		'src/js/sections/*.js',
		'src/js/scripts.js',
	],
	jsDest = 'assets/js';

gulp.task('js',function(){
	gulp.src(jsFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(header(banner, { package : package }))
		.pipe(gulp.dest(jsDest))
		.pipe(uglify().on('error', gutil.log))
		.pipe(header(banner, { package : package }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(jsDest))
		.pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', false, function(){
	browserSync.init({
		proxy: "http://janmichael.local"
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task( 'default', ['css', 'js', 'browser-sync'], function () {
	gulp.watch("./src/scss/*/*.scss", ['css']);
	gulp.watch("./src/js/**/*.js", ['js']);
	gulp.watch("./**/*.php", ['bs-reload']);
});
