angular.module('artists', [])
  .controller('ArtistsCtrl', require('./artists'))
  .service('artistService', require('./artistService'))
  .config(require('./config'));

module.exports = 'artists';
