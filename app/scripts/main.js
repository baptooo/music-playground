var angular = require('angular'),
  routes = require('./core/routes');

var app = angular.module('music-playground', [
  require('angular-animate'),
  require('angular-ui-router'),
  require('./artists'),
  require('./albums')
]).config(routes)
  .constant('apiUrl', '/api');

// Services
app.service('playlistService', require('./services/playlistService'));
app.service('trackService', require('./services/trackService'));

// Controllers
app.controller('Tracks', require('./controllers/tracks'));

// Filters
app.filter('startFrom', require('./filters/startFrom'));

// Directives
app.directive('audioPlayer', require('./directives/audioPlayer'));
app.directive('returnTop', require('./directives/returnTop'));
