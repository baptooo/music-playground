function ArtistsCtrl(artistPromise) {
  var artists = this;

  artists.items = artistPromise;
  artists.clearResearch = _clearResearch;

  function _clearResearch() {
    artists.nameFilter = '';
  }
}

module.exports = ArtistsCtrl;
