var ssqApp = angular.module('ssqApp', [
  // vendor modules
  'ngRoute',
  'ui.bootstrap',
  'angular-flash.service', 
  'angular-flash.flash-alert-directive',

  // application modules
  'baseControllers',
  'setupControllers',
  'keyringControllers',
  'loginsControllers',
  'services'
])

ssqApp.config(
  function($routeProvider) {
    $routeProvider.
      when('/base', {
        templateUrl: 'partials/base.html',
        controller: 'BaseCtrl'
      }).
      when('/setup', {
        templateUrl: 'partials/setup.html',
        controller: 'SetupCtrl'
      }).
      when('/setup/key', {
        templateUrl: 'partials/keyring/generate.html',
        controller: 'SetupKeyCtrl'
      }).
      when('/keyring', {
        templateUrl: 'partials/keyring/index.html',
        controller: 'KeyringCtrl'
      }).
      when('/keyring/unlock', {
        templateUrl: 'partials/keyring/unlock.html',
        controller: 'KeyringUnlockCtrl'
      }).
      when('/keyring/generate', {
        templateUrl: 'partials/keyring/generate.html',
        controller: 'KeyringGenerateCtrl'
      }).
      when('/logins', {
        templateUrl: 'partials/logins/index.html',
        controller: 'LoginsCtrl'
      }).
      otherwise({
        redirectTo: '/base'
      })
  })
