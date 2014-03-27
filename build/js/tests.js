module('Initialize - Application Loads', {
  setup: function() {
    App.reset();
  },
  teardown: function() {
    App.reset();
  }
});

test('that the application loads and initializes', function() {
  visit('/').then(function() {
    expect(1);
    ok($(App.rootElement).hasClass('ember-application'));
  })
});

module('Integration - The Body Class', {
  setup: function() {
    App.reset();
  },
  teardown: function() {
    App.reset();
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