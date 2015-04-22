var angular = require('angular'),
  routes = require('./core/routes');

var app = angular.module('music-playground', [
  require('angular-animate'),
  require('angular-ui-router'),
  require('./artists'),
  require('./albums'),
  require('./tracks')
]).config(routes)
  .constant('apiUrl', '/api');

// Services
app.service('playlistService', require('./services/playlistService'));

// Controllers
app.controller('Playlist', require('./controllers/playlist'));

// Filters
app.filter('startFrom', require('./filters/startFrom'));

// Directives
app.directive('audioPlayer', require('./directives/audioPlayer'));
app.directive('returnTop', require('./directives/returnTop'));
