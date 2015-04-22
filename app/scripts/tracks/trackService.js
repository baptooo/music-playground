function trackService($http, $q, $stateParams, $rootScope, apiUrl) {
  apiUrl += '/tracks/';
  var trackBaseUrl = '/track/?path=',
    _currentTracks;

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

        _currentTracks = tracks;

        return deffer.resolve(tracks);
      }).error(function () {
        return deffer.error(new Error('Error, no data.'));
      });

      return deffer.promise;
    },

    getTrackByLabel: function (label) {
      for (var i = 0, len = _currentTracks.length; i < len; i++) {
        var track = _currentTracks[i];
        if(track.label === label) {
          return track;
        }
      }
    },

    getTrackPath: function (track) {
      return trackBaseUrl + encodeURI(track.path);
    },

    setCurrentTrack: function (track) {
      $rootScope.trackPath = this.getTrackPath(track);
      $rootScope.trackSelected = track.path;
      $rootScope.trackUri = this.getTrackRoute(track);
    }
  }
}

module.exports = trackService;
