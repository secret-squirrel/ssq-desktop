var ssqApp = angular.module('ssqApp', [
  'ngRoute',
  'controllers',
  'services'
])

ssqApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
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
      otherwise({
        redirectTo: '/keyring'
      })
  }])
