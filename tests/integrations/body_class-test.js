module('Integration - The Body Class', {
  setup: function() {
    App.reset();
    mockSettings();
  },
  teardown: function() {
    App.reset();
    App.Db.clear();
  }
});

test('that the correct body class is applied', function() {
  expect(3);
  visit('/styleguide').then(function(){
    var root = $(App.rootElement);
    ok(root.hasClass('styleguide'), 'body class was expected to be "styleguide"');
  }).visit('/').then(function() {
    var root = $(App.rootElement);
    ok(!root.hasClass('styleguide'), 'body still has the "styleguide" class');
    ok(root.hasClass('index'), 'body class was expected to be "index"');
  });
});
