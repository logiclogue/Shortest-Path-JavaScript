var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var paths = {
	javascript: [
		'js/*.js'
	],
	css: [
		'css/*.css'
	]
};


// Concats all JavaScript files
gulp.task('javascript', function () {
	return gulp.src(paths.javascript)
		.pipe(concat('all.js'))
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