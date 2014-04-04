function startApp(attrs) {

  var App;

  var attributes = Ember.merge({
    // useful Test defaults
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false
  }, attrs); // but you can override;

  Ember.Router.reopen({
    location: 'none'
  });

  Ember.run(function(){
    App = Ember.Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  return App;

}

function mockSettings() {
  var mockSettings = {email: 'john.smith@test.com', publicKey: 'xxx', privateKey: 'xxx', masterPasswordSet: true};
  App.Db.write('settings', mockSettings);
}