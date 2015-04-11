module.exports = function ($scope, albumPromise, artistPromise, $location, albumService, $stateParams, $rootScope) {
  $scope.albums = albumPromise;
  var _t = this;

  this.setCurrentAlbum = function (album) {
    $rootScope.currentAlbum = album;
    $rootScope.tracksHead = {
      title: album.name,
      artist: $scope.currentArtist.name
    }
  }

  $scope.navigateToTracks = function (album) {
    _t.setCurrentAlbum(album);
    $location.path('/albums/' + $stateParams.artist + '/tracks/' + album.label);
  };

  $rootScope.$watch('currentAlbumName', function (value) {
    var dataLen = $scope.albums.length;
    if (!value || !dataLen) {
      return true;
    }
    for (var i = 0; i < dataLen; i++) {
      if ($scope.albums[i].label == value) {
        _t.setCurrentAlbum($scope.albums[i]);
        break;
      }
    }
  });

  if ($stateParams.artist) {
    $rootScope.currentArtistName = $stateParams.artist;
  }

  $scope.getAlbumGenre = function (album) {
    return albumService.getGenre(album);
  };
};