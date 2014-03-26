var gulp = require('gulp');

var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');
var stylus = require('gulp-stylus');
var shell = require('gulp-shell');
var preprocess = require('gulp-preprocess')

var paths = {
  scripts: ['app/**/*.js'],
  templates: ['app/templates/**/*.hbs'],
  styles: ['app/styles/**/*.styl'],
  html: ['app/html/*.html'],
  tests: ['tests/**/*-test.js']
};

//-- Copy and concat all javascript to build/js/app.js
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(shell(['touch restart.txt']));
});

//-- Compile and concat all templates to build/js/templates.js
gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(handlebars({
      outputType: 'browser',
      templateRoot: false
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(shell(['touch restart.txt']));
});

//-- Compile our Stylus files to app.css
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(shell(['touch restart.txt']));
});

//-- Process our HTML files
gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(preprocess())
    .pipe(gulp.dest('./'))
    .pipe(shell(['touch restart.txt']));
});

//-- Build our test files
gulp.task('test', function() {
  gulp.src(paths.tests)
    .pipe(concat('tests.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(shell(['touch restart.txt']));
});

//-- Watch our paths and run our tasks
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.tests, ['test']);
});

//-- Default task (called when you run `gulp` from cli
gulp.task('default', ['scripts', 'templates', 'html', 'test', 'watch']);