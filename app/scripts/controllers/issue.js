'use strict';

/**
 * @ngdoc function
 * @name ghTesterApp.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the ghTesterApp
 */
angular.module('ghTesterApp')
  .controller('IssueCtrl', function ($scope, $http, user) {
    $scope.user = user;
    $scope.createLink = createLink;
    getIssues();

    
    function getIssues() {
      var accessToken = 'access_token';
      $http.get('https://api.github.com/repos/awaxman11/gh-tester/issues', { params: { accessToken : user.accessToken }})
          .success(function (data) {
            $scope.issues = data.reverse();
            $scope.accessToken = accessToken;
          })
          .error(function (e) {
            console.log(e);
          });
    }
    function createLink(apiLink) {
      var link = apiLink.replace('https://api.github.com/repos', 'https://github.com');
      return link;
    }
  });

