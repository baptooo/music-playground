app.controller('Artists', function ($scope, artistPromise, $location, $rootScope) {
  $scope.artists = artistPromise;

  $scope.navigateToArtist = function (artist) {
    $rootScope.currentArtist = artist;
    $location.path('/albums/' + artist.label);
  };

  $rootScope.$watch('currentArtistName', function (value) {
    var dataLen = $scope.artists.length;
    if (!value || !dataLen) {
      return true;
    }
    for (var i = 0; i < dataLen; i++) {
      if ($scope.artists[i].label == value) {
        $rootScope.currentArtist = $scope.artists[i];
        break;
      }
    }
  });
});