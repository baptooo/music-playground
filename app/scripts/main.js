var angular = require('angular'),
  config = require('./core/config'),
  constants = require('./core/constants');

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
  'constants'
]).config(config)
  .constant('apiUrl', '/api');
