var gulp = require('gulp')
var shell = require('gulp-shell')
var NwBuilder = require('node-webkit-builder')

var nw = new NwBuilder({
  version: '0.8.6',
  files: './src/**/**',
  platforms: ['osx']
})

nw.on('log',  console.log)

gulp.task('shell-install', shell.task([
  'bower cache clean && bower install && cd src && npm install'
]))

gulp.task('node-webkit-install', function() {
  return nw.build().then(function () {
    console.log('Successfully built node-webkit.')
  }).catch(function (error) {
    console.error(error)
  })
})

gulp.task('install', ['shell-install', 'node-webkit-install'])

gulp.task('run', function() {
  return nw.run()
})

gulp.task('default', ['run'])
