module.exports = function ($scope, artistPromise, $location, $rootScope) {
  $scope.artists = artistPromise;

  $scope.navigateToArtist = function (artist) {
    $rootScope.currentArtist = artist;
    $location.path('/albums/' + artist.label);
  };

  $scope.onChange = function () {
    var value = $scope.nameFilter;
    console.log($scope);
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
};