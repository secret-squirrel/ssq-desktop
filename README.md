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
* **Tab-1** - `gulp` - starts to compile javascript, templates, and styles.
* **Tab-2** - `./node-webkit.app/Contents/MacOS/node-webkit pms.nw` - starts the node-webkit app. (or `npm start`)

## Architecture Brief

This project is built using [node-webkit](https://github.com/rogerwang/node-webkit), the same framework that Github used to build their [Atom](http://atom.io) editor. The actual application code is written on top of [Ember.js](http://emberjs.com), which is specifically designed for long-running applications. In order to compile everything properly, we've tapped [Gulp.js](http://gulpjs.com), which is faster than Grunt.

## Platform

* [node-webkit](https://github.com/rogerwang/node-webkit)
* [Ember Canary](http://emberjs.com/builds/)
* [Stylus](http://learnboost.github.io/stylus/)
* [Gulp](http://gulpjs.com/)

## Troubleshooting

* **EMFILE Error** - The default limit for open files in OSX is 256. This is quite low and can cause issues during file compliation. To fix this issue, run the command: `ulimit -n 10240`
* **Manually Restart** - You should be able to just `touch restart.txt`