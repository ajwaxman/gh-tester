(function() {
  'use strict';
  angular.module('simpleLogin', ['firebase', 'firebase.utils', 'firebase.config'])

    // a simple wrapper on simpleLogin.getUser() that rejects the promise
    // if the user does not exists (i.e. makes user required), useful for
    // setting up secure routes that require authentication
    .factory('authRequired', function(simpleLogin, $q) {
      return function() {
        return simpleLogin.getUser().then(function (user) {
          return user ? user : $q.reject({ authRequired: true });
        });
      };
    })

    .factory('simpleLogin', function($firebaseSimpleLogin, fbutil, $q, $rootScope) {
      var auth = $firebaseSimpleLogin(fbutil.ref());
      var listeners = [];

      function statusChange() {
        fns.initialized = true;
        fns.user = auth.user || null;
        angular.forEach(listeners, function(fn) {
          fn(fns.user);
        });
      }

      var fns = {
        user: null,

        initialized: false,

        getUser: function() {
          return auth.$getCurrentUser();
        },

        login: function(provider, opts) {
          return auth.$login(provider, opts);
        },

        logout: function() {
          auth.$logout();
        },

        watch: function(cb, $scope) {
          listeners.push(cb);
          fns.getUser().then(function(user) {
            cb(user);
          });
          var unbind = function() {
            var i = listeners.indexOf(cb);
            if( i > -1 ) { listeners.splice(i, 1); }
          };
          if( $scope ) {
            $scope.$on('$destroy', unbind);
          }
          return unbind;
        }
      };

      $rootScope.$on('$firebaseSimpleLogin:login', statusChange);
      $rootScope.$on('$firebaseSimpleLogin:logout', statusChange);
      $rootScope.$on('$firebaseSimpleLogin:error', statusChange);
      auth.$getCurrentUser(statusChange);

      return fns;
    });
})();