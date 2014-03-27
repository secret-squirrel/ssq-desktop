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
  actions: {
    generate: function() {
      var _this = this;
      var keygen = require('ssh-keygen');
      var fs = require('fs');

      var location = process.cwd() + '/secretsquirrel.key';
      console.log(location);
      var password = 'passpass';
      keygen({
        location: location,
        password: password,
        read: true
      }, function(err, out) {
        if(err) {
          alert('There was a problem generating your SSH key!');
          return;
        }
        alert("Your key was generated, but I can't figure out javascript scope so you can't have it...");
      });
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