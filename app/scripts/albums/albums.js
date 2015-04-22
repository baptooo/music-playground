function AlbumsCtrl($scope, albumPromise, $location, albumService, $stateParams, $rootScope) {
  var albums = this;

  albums.items = albumPromise;
  albums.artist = $stateParams.artist;

  this.setCurrentAlbum = function (album) {
    $rootScope.currentAlbum = album;
    $rootScope.tracksHead = {
      title: album.name,
      artist: $scope.currentArtist.name
    }
  };

  $rootScope.$watch('currentAlbumName', function (value) {
    var dataLen = albums.items.length;
    if (!value || !dataLen) {
      return true;
    }
    for (var i = 0; i < dataLen; i++) {
      if (albums.items[i].label == value) {
        albums.setCurrentAlbum(albums.items[i]);
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
}

module.exports = AlbumsCtrl;
