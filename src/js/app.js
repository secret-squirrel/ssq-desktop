var ssqApp = angular.module('ssqApp', [
  'ngRoute',
  'controllers'
])

ssqApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/keyring', {
        templateUrl: 'partials/keyring.html',
        controller: 'KeyringController'
      }).
      otherwise({
        redirectTo: '/keyring'
      })
  }])
