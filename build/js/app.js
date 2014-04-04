var App;

if(ENV != 'test') {

  App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_VIEW_LOOKUPS: true
  });

}else{

  Ember.run(function() {
    App = Ember.Application.create({
      rootElement: '#ember-testing',
      LOG_ACTIVE_GENERATION:false,
      LOG_VIEW_LOOKUPS: false
    });
    App.setupForTesting();
    App.injectTestHelpers();
    Ember.Router.reopen({location: 'none'});
  });

  Ember.Router.reopen({
    location: 'none'
  });

}

App.Db = Ember.Object.create({

  read: function(key, value) {
    return localStorage[key];
  },

  write: function(key, value) {
    localStorage[key] = value;
    return localStorage[key];
  },

  clear: function() {
    localStorage.clear();
    return true;
  },

  hasValidSettings: function() {
    var settings = this.read('settings')
    if (!settings) {
      return false;
    }
    var hasSettings = true;
    for(var i=0; i < this.requiredSettings.length; i++) {
      var value = localStorage[this.requiredSettings[i]]
      if (value == undefined || value.length == 0) {
        hasSettings = false;
      }
    }
    return hasSettings;
  },

  requiredSettings: function() {
    return [
      'email',
      'masterPasswordSet',
      'publicKey',
      'privateKey'
    ];
  }

});
App.Router.map(function() {
  this.resource('setup');
  this.resource('styleguide');
  this.resource('welcome');
});

if(window.ENV == 'development') {

};
if(window.ENV == 'production') {

};
if(window.ENV == 'test') {

};
App.SetupController = Ember.Controller.extend({

  keyPassword: '',
  keyPasswordConfirm: '',

  actions: {
    generate: function() {
      var _this = this;
      this.set('error', false);
      var keygen = require('ssh-keygen');
      var fs = require('fs');
      var location = process.cwd() + '/secretsquirrel.key';
      if (this.get('keyPassword') == '') {
        this.set('error', 'You must provide a master password');
        return;
      }
      if (this.get('keyPassword') != this.get('keyPasswordConfirm')) {
        this.set('error', 'Your passwords did not match');
        return;
      }
      var password = 'passpass';
      keygen({
        location: location,
        password: password,
        read: true
      }, function(err, out) {
        if(err) {
          _this.set('keyError', true);
        }else{
          _this.set('key', out);
        }
      });
    }
  }
});
App.ApplicationRoute = Ember.Route.extend({

  redirect: function(arg, transition) {
    if (!App.Db.hasValidSettings() && transition.targetName != 'styleguide') {
      this.transitionTo('setup');
    }
  }

});

App.SetupRoute = Ember.Route.extend({

});
Ember.Route.reopen({
  activate: function() {
    var cssClass = this.toCssClass();
    if (cssClass !== 'application') {
      Ember.$(this.rootElement()).addClass(cssClass);
    }
  },
  deactivate: function() {
    Ember.$(this.rootElement()).removeClass(this.toCssClass());
  },
  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  },
  rootElement: function() {
    return this.router.namespace.get('rootElement');
  }
});