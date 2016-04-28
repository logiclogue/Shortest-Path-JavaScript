var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var paths = {
	javascript: [
		'js/**/*.js'
	],
	css: [
		'css/*.css'
	]
};


// JavaScript tasks
gulp.task('javascript', function () {
	return browserify('./js/Main.js')
		.transform('babelify', {
			presets: ['es2015'],
            plugins: ['transform-class-properties'],
			sourceMaps: false
		})
		.bundle()
		.on('error', function (error) {
			console.log(error);
			this.emit('end');
		})
		.pipe(source('all.js'))
		.pipe(gulp.dest('build'));
});


// Concats all CSS files
gulp.task('css', function () {
	return gulp.src(paths.css)
		.pipe(concat('all.css'))
		.pipe(gulp.dest('build'));
});


// Watches all
gulp.task('watch', function () {
	gulp.watch(paths.javascript, ['javascript']);
	gulp.watch(paths.css, ['css']);
});


// Default task
gulp.task('default', ['javascript', 'css', 'watch']);
