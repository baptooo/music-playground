var app = angular.module('sandbox', ['ngRoute', 'ui.router', 'ngAnimate']);

app.config(function ($stateProvider, $urlRouterProvider) {

    // Default Route is home
    $urlRouterProvider.otherwise('/home');

    // Route configuration
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'src/views/home.html'
        })
        .state('albums', {
            url: '/albums/:artist',
            templateUrl: 'src/views/home.html'
        })
});