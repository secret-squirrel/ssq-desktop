var NodeWebkitBuilder = require('node-webkit-builder')

var gulp = require('gulp')
var mocha = require('gulp-mocha')
var gutil = require('gulp-util')
var stylus = require('gulp-stylus')
var shell = require('gulp-shell')
var preprocess = require('gulp-preprocess')
var clean = require('gulp-clean')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')

var merge = require('merge')

var paths = {
  scripts: ['src/js/**/*.js'],
  styles: ['src/styles/**/*.styl'],
  html: ['src/html/**/*.html'],
  tests: ['test/**/*-test.js'],
  vendor: ['vendor/**'],
  other: ['src/package.json']
}

var nwOptions = {
  version: '0.9.2',
  cacheDir: './tmp/cache',
  checkVersions: false
}

gulp.task('run', ['build'], function() {
  var nw = new NodeWebkitBuilder(merge(nwOptions, { 
    files: './build/**',
    platforms: ['osx']
  }))
  nw.on('log', function(msg) {
    console.log(msg)
  })
  nw.on('stdout', function(msg) {
    console.log(msg.toString())
  })
  nw.on('stderr', function(msg) {
    console.log(msg.toString())
  })
  nw.run()
})

gulp.task('release', ['build'], function() {
  var package = require('./package.json')

  var modules = []
  if (package.dependencies) {
    modules = Object.keys(package.dependencies)
              .filter(function(m) { return m != 'nodewebkit' })
              .map(function(m) { return './node_modules/'+m+'/**/*' })
  }

  var nw = new NodeWebkitBuilder(merge(nwOptions, { 
    files: [ './build/**/*' ].concat(modules),
    buildDir: './release',
    platforms: ['osx', 'win']
  }))

  nw.on('log', function(msg) {
    console.log(msg)
  })

  nw.build(function(err) {
    if (err) console.error(err)
  })
})

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(preprocess())
    .pipe(gulp.dest('build'))
})

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
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
    .pipe(mocha({ reporter: 'dot' }))
    .on('error', gutil.log)
})

gulp.task('clean', function() {
  return gulp.src('build', { read: false })
    .pipe(clean())
})

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html'])
  gulp.watch(paths.scripts, ['scripts'])
  gulp.watch(paths.vendor, ['vendor'])
  gulp.watch(paths.other, ['other'])
  gulp.watch(paths.styles, ['styles'])
  gulp.watch(['src/**', 'test/**'], ['test'])
})

gulp.task('build', ['html', 'scripts', 'styles', 'vendor', 'other'])
gulp.task('default', ['build', 'watch'])
