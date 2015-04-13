var angular = require('angular'),
  routes = require('./core/routes');

var app = angular.module('sandbox', [
  require('angular-animate'),
  require('angular-ui-router')
]).config(routes)
  .constant('apiUrl', '/api');

// Services
app.service('artistService', require('./services/artistService'));
app.service('albumService', require('./services/albumService'));
app.service('playlistService', require('./services/playlistService'));
app.service('trackService', require('./services/trackService'));

// Controllers
app.controller('Albums', require('./controllers/albums'));
app.controller('Artists', require('./controllers/artists'));
app.controller('Albums', require('./controllers/albums'));
app.controller('Tracks', require('./controllers/tracks'));

// Filters
app.filter('startFrom', require('./filters/startFrom'))

// Directives
app.directive('audioPlayer', require('./directives/audioPlayer'));
app.directive('returnTop', require('./directives/returnTop'));