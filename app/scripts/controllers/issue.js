'use strict';

/*global Firebase */

/**
 * @ngdoc function
 * @name ghTesterApp.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the ghTesterApp
 */
angular.module('ghTesterApp')
  .controller('IssueCtrl', function ($scope, $http, user, $firebase) {
    $scope.user = user;
    
    // Retrieve an array of issues from Firebase
    var issuesRef = new Firebase('https://luminous-heat-3872.firebaseio.com/issues');
    var sync = $firebase(issuesRef);
    var issuesArray = sync.$asArray();
    $scope.issues = issuesArray;


  });

