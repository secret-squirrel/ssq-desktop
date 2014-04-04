module('Route - Welcome Route Test', {
  setup: function() {
    App.reset();
  },
  teardown: function() {
    App.reset();
  }
});

test('that the welcome route loads correctly', function() {
  visit('/welcome').then(function() {
    expect(1);
    ok($(App.rootElement).hasClass('ember-application'));
  })
});