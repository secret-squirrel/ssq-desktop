```
                         _                   _               _ 
                        | |                 (_)             | |
  ___  ___  ___ _ __ ___| |_ ___  __ _ _   _ _ _ __ _ __ ___| |
 / __|/ _ \/ __| '__/ _ \ __/ __|/ _` | | | | | '__| '__/ _ \ |
 \__ \  __/ (__| | |  __/ |_\__ \ (_| | |_| | | |  | | |  __/ |
 |___/\___|\___|_|  \___|\__|___/\__, |\__,_|_|_|  |_|  \___|_|
                                    | |                        
                                    |_|                        
```

## Quick Start

* `git clone git@github.com:twg/secretsquirrel-desktop.git && cd secretsquirrel-desktop`
* `npm install`
* `npm install -g bower` and `npm install -g gulp` if you don't already have
  them installed globally.
* `bower install`
* **Tab-1** - `gulp` - starts to compile javascript, templates, and styles.
* **Tab-2** - `./node-webkit.app/Contents/MacOS/node-webkit pms.nw` - starts the node-webkit app. (or `npm start`)

## Running Tests (TODO)

* With the toolbar enabeled (`package.json`), manually visit `/test.html`

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
