function ArtistsCtrl(artistPromise) {
  var artists = this;

  artists.items = artistPromise;
}

module.exports = ArtistsCtrl;
