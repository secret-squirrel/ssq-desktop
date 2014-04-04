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
