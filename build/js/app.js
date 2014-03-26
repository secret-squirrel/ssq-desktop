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
  this.resource('styleguide');
});

if(window.ENV == 'development') {

};
if(window.ENV == 'production') {

};
if(window.ENV == 'test') {

};