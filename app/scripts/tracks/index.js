angular.module('tracks', [])
  .controller('TracksCtrl', require('./tracks'))
  .service('trackService', require('./trackService'))
  .config(require('./config'));

module.exports = 'tracks';
