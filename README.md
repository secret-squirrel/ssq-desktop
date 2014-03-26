```
  _____  __  __  _____        _____ _    _ _____ 
 |  __ \|  \/  |/ ____|      / ____| |  | |_   _|
 | |__) | \  / | (___ ______| |  __| |  | | | |  
 |  ___/| |\/| |\___ \______| | |_ | |  | | | |  
 | |    | |  | |____) |     | |__| | |__| |_| |_ 
 |_|    |_|  |_|_____/       \_____|\____/|_____|
                                                 
```

## Quick Start

* `git clone git@github.com:twg/pms-gui.git && cd pms-gui`
* `npm install`
* `bower install`
* `gulp` - starts to compile javascript, templates, and styles.
* `./node-webkit.app/Contents/MacOS/node-webkit pms.nw` - starts the node-webkit app.

## Architecture Brief

This project is built using [node-webkit](https://github.com/rogerwang/node-webkit), the same framework that Github used to build their [Atom](http://atom.io) editor. The actual application code is written on top of [Ember.js](http://emberjs.com), which is specifically designed for long-running applications. In order to compile everything properly, we've tapped [Gulp.js](http://gulpjs.com), which is faster than Grunt.

## Platform

* [node-webkit](https://github.com/rogerwang/node-webkit)
* [Ember Canary](http://emberjs.com/builds/)
* [Stylus](http://learnboost.github.io/stylus/)
* [Gulp](http://gulpjs.com/)
