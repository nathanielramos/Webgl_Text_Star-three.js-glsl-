const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

const { src, dest } = require('../config');

function compileHandlebars(compress = false) {
	gulp.src([`${src}/hbs/*.hbs`])
    .pipe(handlebars(require('../src/hbs/data/main.json'), {
        batch : [`${src}/hbs/partials`]
		}))
		.pipe(rename({
			extname: '.html'
		}))
    .pipe(htmlmin({
			collapseWhitespace: compress
		}))
    .pipe(gulp.dest('dest'));
}

gulp.task('build:hbs', () => {
	compileHandlebars(true);
});

gulp.task('dev:hbs', () => {
	compileHandlebars();
});

gulp.task('watch:hbs', () => {
	gulp.watch(`${src}/hbs/**/*.hbs`, ['dev:hbs']);
});