angular.module('audioPlayer', [])
  .directive('mpAudioPlayer', require('./audioPlayer'))
  .service('audioPlayerService', require('./audioPlayerService'));

module.exports = 'audioPlayer';
