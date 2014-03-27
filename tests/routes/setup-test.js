module('Route - Setup Route Test', {
  setup: function() {
    App.reset();
  },
  teardown: function() {
    App.reset();
  }
});

test('that the route is loaded', function() {
  visit('/setup').then(function() {
    expect(2);
    ok(find('.title:contains("Setup")').length);
    ok($(App.rootElement).hasClass('ember-application'));
  })
});

test('clicking generate will generate an SSH key', function() {
  visit('/setup').then(function() {
    
  });
});