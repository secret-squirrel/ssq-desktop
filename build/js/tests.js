module('Acceptances - Application Loads', {
  setup: function() {
    App.reset()
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('that the application loads and initializes', function() {
  visit('/').then(function() {
    expect(1);
    ok($(App.rootElement).hasClass('ember-application'));
  })
});
