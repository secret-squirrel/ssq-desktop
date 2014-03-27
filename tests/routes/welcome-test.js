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
    expect(2);
    ok(find('.title:contains("Welcome")').length);
    ok($(App.rootElement).hasClass('ember-application'));
  })
});