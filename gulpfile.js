var gulp = require('gulp')
var mocha = require('gulp-mocha')
var gutil = require('gulp-util')
var stylus = require('gulp-stylus')
var shell = require('gulp-shell')
var preprocess = require('gulp-preprocess')

var paths = {
  scripts: ['src/js/**/*.js'],
  styles: ['src/styles/**/*.styl'],
  html: ['src/html/**/*.html'],
  tests: ['test/**/*-test.js'],
  vendor: ['vendor/**'],
  other: ['src/package.json']
}

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(preprocess())
    .pipe(gulp.dest('build'))
})

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(preprocess())
    .pipe(gulp.dest('build/js'))
})

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(stylus())
    .pipe(preprocess())
    .pipe(gulp.dest('build'))
})

gulp.task('vendor', function() {
  return gulp.src(paths.vendor)
    .pipe(gulp.dest('build/vendor'))
})

gulp.task('other', function() {
  return gulp.src(paths.other)
    .pipe(gulp.dest('build'))
})

gulp.task('test', function() {
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log)
})

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html'])
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch(paths.vendor, ['vendor'])
  gulp.watch(paths.other, ['other'])
  gulp.watch(paths.styles, ['styles'])
  gulp.watch(['src/**', 'test/**'], ['test'])
})

gulp.task('default', ['html', 'scripts', 'styles', 'vendor', 'other', 'test', 'watch'])
