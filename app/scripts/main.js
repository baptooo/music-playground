var angular = require('angular'),
  config = require('./core/config');

require('angular-material-icons');

var app = angular.module('music-playground', [
  'ngMdIcons',
  require('angular-animate'),
  require('angular-ui-router'),
  require('angular-aria'),
  require('angular-material'),
  require('./common/directives'),
  require('./common/filters'),
  require('./artists'),
  require('./albums'),
  require('./tracks'),
  require('./playlist'),
  require('./listen'),
  require('./audioplayer'),
]).config(config)
  .constant('apiUrl', '/api');
