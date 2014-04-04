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