app.service('trackService', ['$http', '$q', '$stateParams', '$rootScope', function ($http, $q, $stateParams, $rootScope) {
  var apiUrl = '/api/tracks/',
    trackBaseUrl = '/track/?path=';

  return {
    getTrackRoute: function (track) {
      return '/albums/' + $stateParams.artist + '/tracks/' + $stateParams.album + '/listen/' + track.label;
    },

    getTracksForAlbum: function (name) {
      var deffer = $q.defer();
      $http({
        method: 'GET',
        url: apiUrl + name + '.json'
      }).success(function (data) {
        var tracks = [];
        for (var i in data) {
          data[i].label = i;
          tracks.push(data[i]);
        }
        return deffer.resolve(tracks);
      }).error(function () {
        return deffer.error(new Error('Error, no data.'));
      })
      return deffer.promise;
    },

    getTrackPath: function (track) {
      return trackBaseUrl + encodeURI(track.path);
    },

    setCurrentTrack: function (track) {
      $rootScope.trackPath = this.getTrackPath(track);
      $rootScope.trackSelected = track.path;
      $rootScope.trackUri = this.getTrackRoute(track);
      $rootScope.currentTrack = {
        title: track.title,
        artist: $rootScope.currentArtist.name
      };
    },
  }
}]);