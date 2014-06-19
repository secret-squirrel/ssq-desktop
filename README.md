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

### Setup

* Requirements: [Node](http://nodejs.org/) & [Gulp.js](http://gulpjs.com/) (`npm install -g gulp`)
* `git clone git@github.com:secret-squirrel/ssq-desktop.git`
* `cd ssq-desktop && npm install && bower install`

#### Development 

* **Tab 1** - `gulp` - watches and triggers `build` whenever any source files change.
* **Tab 2** - `gulp run` - starts the node-webkit app

#### Release

* `gulp release` - creates releases for each platform in `release`

### Tests

* `gulp test` or `mocha` - Run tests manually
* The default `gulp` task will run the tests whenever any source or test files change.

![Up and Running](http://i.imgur.com/xVU4DMa.png)
