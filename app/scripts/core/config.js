function config($urlRouterProvider) {
  // Default Route is home
  $urlRouterProvider.otherwise('/');
}

module.exports = config;
