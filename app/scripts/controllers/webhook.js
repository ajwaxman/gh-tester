'use strict';

/*global Firebase */

/**
 * @ngdoc function
 * @name ghTesterApp.controller:WebhookCtrl
 * @description
 * # WebhookCtrl
 * Controller of the ghTesterApp
 */

angular.module('ghTesterApp')
  .controller('WebhookCtrl', function ($scope, $http, fbutil, $firebase) {
    var webhooksRef = new Firebase('https://luminous-heat-3872.firebaseio.com/webhooks');
    var issuesRef = new Firebase('https://luminous-heat-3872.firebaseio.com/issues');
    var sync = $firebase(webhooksRef);
    var webhooksArray = sync.$asArray();
    $scope.webhooks = webhooksArray;


    // Get the latest webhook
    var webhooksQuery = webhooksRef.limit(1);
    
    webhooksQuery.on('child_added', function (snapshot) {
      var webhook = snapshot.val();
      var issue = webhook.issue;
      var issueId = issue.id;

      createOrUpdateIssue(issueId, issue);
      
      // Remove webhook reference 
      // snapshot.ref().remove();

    });

    function createOrUpdateIssue(issueId, issue) {
      issuesRef.child(issueId).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        issueExistsCallback(issueId, issue, exists) ;
      });
    }

    function issueExistsCallback(issueId, issue, exists) {
      if (exists) {
        // Update the issue
        console.log('IssueId ' + issueId + ' already exists.');
      } else {
        // Create a new issue
        issuesRef.child(issueId).set(issue);
        console.log('Just created issueId: ' + issueId);
      }
    }

});