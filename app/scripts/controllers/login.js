'use strict';
/**
 * @ngdoc function
 * @name ghTesterApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('ghTesterApp')
  .controller('LoginCtrl', function ($scope, simpleLogin, $location) {
    $scope.oauthlogin = function(provider) {
      login(provider, {
        rememberMe: true,
        scope: 'public_repo'
      });
    };

    function login(provider, opts) {
      $scope.err = null;
      simpleLogin.login(provider, opts).then(
        function() {
          $location.path('/account');
        },
        function(err) {
          $scope.err = err;
        }
      );
    }

  });