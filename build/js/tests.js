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

module('Route - Application Route Test', {
  setup: function() {
    App.reset();
  },
  teardown: function() {
    App.reset();
    App.Db.clear();
  }
});

test('it redirects to the setup route if the user has invalid settings', function() {
  visit('/').then(function() {
    expect(2);
    equal(App.Db.read('settings'), undefined, 'Settings should be undefined, but was not');
    equal(currentRouteName(), 'setup', 'The user was not redirected to the setup route');
  });
});

test('it does not redirect if the user has valid settings', function() {
  App.Db.write('settings', {email: 'test@test.com', publicKey: 'xxx', privateKey: 'xxx', masterPasswordSet: true});
  visit('/').then(function() {
    expect(1);
    equal(currentRouteName(), 'index', 'The route is incorrect');
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
    ok(find('.title').length, 'The title was not found');
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
    expect(1);
    ok($(App.rootElement).hasClass('ember-application'));
  })
});
module('Units - Db Test', {
  setup: function() {
    App.reset();
  },
  teardown: function() {
    App.Db.clear();
    App.reset();
  }
});

test('it is defined', function() {
  expect(1);
  ok(typeof App.Db == 'object');
});

test('it can write and read basic strings', function() {
  expect(1);
  App.Db.write('key', 'value');
  equal(App.Db.read('key'), 'value', 'The strings were not equal');
});

test('it can write and read objects', function() {
  expect(1);
  data = {'name': 'John Smith', 'email': 'john.smith@test.com'}
  App.Db.write('test-settings', data);
  equal(App.Db.read('test-settings'), data, 'The objects were different');
});

test('it can clear the database', function() {
  expect(2);
  App.Db.write('here', 'here');
  equal('here', App.Db.read('here'));
  App.Db.clear();
  ok(App.Db.read('here') == undefined, 'The database was not cleared: ' + App.Db.read('key').toString());
});

test('it should detect when a user has valid settings', function() {
  expect(5);
  ok(!App.Db.read('settings'), 'Settings were not properly removed during the test');
  ok(!App.Db.hasValidSettings(), 'Settings should not be valid yet');
  var settings = {email: 'emerson.lackey@gmail.com', publicKey: 'xxx', privateKey: 'xxx', masterPasswordSet: true};
  App.Db.write('settings', settings);
  ok(App.Db.hasValidSettings(), 'Settings should be valid now');
  App.Db.clear();
  settings.email = '';
  ok(App.Db.write(settings));
  ok(!App.Db.hasValidSettings());
});
