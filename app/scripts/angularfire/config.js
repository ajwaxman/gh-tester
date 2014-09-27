angular.module('firebase.config', [])
  .constant('FBURL', 'https://luminous-heat-3872.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['github'])

  .constant('loginRedirectPath', '/login');