var ssqApp = angular.module('ssqApp', [
  'ngRoute',
  'controllers',
  'services'
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
