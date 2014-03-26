var gulp = require('gulp');

var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');
var stylus = require('gulp-stylus');

var paths = {
  scripts: ['app/**/*.js'],
  templates: ['app/templates/**/*.hbs'],
  styles: ['app/styles/**/*.styl']
};

//-- Copy and concat all javascript to build/js/app.js
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/js'));
});

//-- Compile and concat all templates to build/js/templates.js
gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(handlebars({
      outputType: 'browser',
      templateRoot: false
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/js'));
});

//-- Compile our Stylus files to app.css
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css'));
});

//-- Watch our paths and run our tasks
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.styles, ['styles']);
});

//-- Default task (called when you run `gulp` from cli
gulp.task('default', ['scripts', 'templates', 'watch']);