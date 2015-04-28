var angular = require('angular'),
  config = require('./core/config');

var app = angular.module('music-playground', [
  require('angular-animate'),
  require('angular-ui-router'),
  require('./common/directives'),
  require('./common/filters'),
  require('./artists'),
  require('./albums'),
  require('./tracks'),
  require('./playlist'),
  require('./listen')
]).config(config)
  .constant('apiUrl', '/api');
