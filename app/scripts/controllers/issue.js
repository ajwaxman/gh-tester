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
      $http.get('https://api.github.com/repos/awaxman11/gh-tester/issues', { params: { access_token: user.accessToken }})
          .success(function (data) {
            $scope.issues = data.reverse();
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
