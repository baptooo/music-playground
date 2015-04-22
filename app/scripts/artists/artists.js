function ArtistsCtrl(artistPromise, $rootScope) {
  var artists = this;

  artists.items = artistPromise;
  artists.updateCurrentArtist = _updateCurrentArtist;

  function _updateCurrentArtist(artist) {
    $rootScope.currentArtist = artist;
  }

  //$rootScope.$watch('currentArtistName', function (value) {
  //  var dataLen = artists.items.length;
  //  if (!value || !dataLen) {
  //    return true;
  //  }
  //  for (var i = 0; i < dataLen; i++) {
  //    if (artists.items[i].label == value) {
  //      $rootScope.currentArtist = artists.items[i];
  //      break;
  //    }
  //  }
  //});
}

module.exports = ArtistsCtrl;
