'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('ghTesterApp')
  .controller('AccountCtrl', function ($scope, user, simpleLogin, fbutil) {
    $scope.user = user;
    $scope.logout = simpleLogin.logout;
    $scope.messages = [];
    loadProfile(user);

    function loadProfile(user) {
      if( $scope.profile ) {
        $scope.profile.$destroy();
      }
      fbutil.syncObject('users/'+user.uid).$bindTo($scope, 'profile');
    }
  });