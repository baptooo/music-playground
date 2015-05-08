function config($urlRouterProvider, $stateProvider) {
  // Default Route is home
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('root', {
    views: {
      'player@': {
        templateUrl: 'scripts/player/player.tpl.html'
      }
    }
  });
}

module.exports = config;
