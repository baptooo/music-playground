function trackService($http, $q, $stateParams, $rootScope, apiUrl) {
  apiUrl += '/tracks/';
  var trackBaseUrl = '/track/?path=',
    _currentTracks;

  function _getTracksForAlbum(name) {
    var deffer = $q.defer();

    $http.get(apiUrl + name + '.json', {
      cache: true
    }).then(function (response) {
      var data = response.data,
        tracks = [];

      for (var i in data) {
        data[i].label = i;
        tracks.push(data[i]);
      }

      _currentTracks = tracks;

      return deffer.resolve(tracks);
    }, function () {
      return deffer.error(new Error('Error, no data.'));
    });

    return deffer.promise;
  }

  function _getTrackByLabel(label) {
    for (var i = 0, len = _currentTracks.length; i < len; i++) {
      var track = _currentTracks[i];
      if (track.label === label) {
        return track;
      }
    }
  }

  function _getTrackRoute(track) {
    return '/albums/' + $stateParams.artist + '/tracks/' + $stateParams.album + '/listen/' + track.label;
  }

  function _getTrackPath(track) {
    return trackBaseUrl + encodeURI(track.path);
  }

  function _setCurrentTrack(track) {
    $rootScope.trackPath = _getTrackPath(track);
    $rootScope.trackSelected = track.path;
    $rootScope.trackUri = _getTrackRoute(track);
  }

  return {
    getTracksForAlbum: _getTracksForAlbum,
    getTrackByLabel: _getTrackByLabel,
    getTrackPath: _getTrackPath,
    getTrackRoute: _getTrackRoute,
    setCurrentTrack: _setCurrentTrack
  }
}

module.exports = trackService;
