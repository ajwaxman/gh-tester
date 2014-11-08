'use strict';

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

      // var issueData = {};
      // issueData[issueId] = issue;
      // issuesRef.set(issueData);


      doesIssueExist(issueId);
      // 

      // Remove webhook reference
      // snapshot.ref().remove();
    });

    function issueExistsCallback(issueId, exists) {
      if (exists) {
        // Update the issue
        console.log('The issue exists');
      } else {
        // Create an issue
        console.log('Need to create an issue');
      }
    }

    function doesIssueExist(issueId) {
      issuesRef.child(issueId).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        issueExistsCallback(issueId, exists) 
      });
    }

    function issueCreated(issueId, success) {
      if (!success) {
        console.log('Issue ' + issueId + ' already exists!');
      } else {
        console.log('Successfully created issue' + issueId);
      }
    }

    function createOrUpdateIssue(issueId, issue) {
      console.log(issueId);
      var exist = issuesRef.child(issueId);
      console.log('Exist ' + exist);
      issuesRef.child(issueId).transaction(function(currentIssueData) {
        console.log('currentIssueData: ' + currentIssueData);
        // If the issue doesn't exist yet
        if (currentIssueData === null){

        }
      }, function(error, committed) {
        console.log('Error: ' + error);
        console.log('Committed: ' + committed);
        // issueCreated(issueId, committed);
      });
    }
});