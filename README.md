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

* Requirements: [Node](http://nodejs.org/), [Ember-CLI](https://github.com/stefanpenner/ember-cli) & [Gulp.js](http://gulpjs.com/) (`sudo npm install -g ember-cli gulp`)
* `git clone git@github.com:secret-squirrel/ssq-desktop.git`
* `cd ssq-desktop && npm install && bower install`
* **Tab 1** - `gulp` - watches and triggers `ember build`
* **Tab 2** - `npm start` - starts the node-webkit app

### Tests

* You should be able to run your tests from within Node-Webkit by manually visiting `dist/tests/index.html`. Make sure the application viewport is large enough to actually see your tests _(the preview will hide them)_.
* It is also fully possible to run the tests outside of Node-Webkit by using the standard `ember server` and visiting `http://0.0.0.0:4200/tests`

![Up and Running](https://dl.dropboxusercontent.com/u/4502950/Github/updated-screenie.png)
