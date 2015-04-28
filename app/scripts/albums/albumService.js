function albumService($http, $q, apiUrl) {
  apiUrl += '/albums';

  function _getAlbumsForArtist(name) {
    var deffer = $q.defer();

    $http.get(apiUrl + '/' + name + '.json', {
      cache: true
    }).then(function (response) {
      var data = response.data,
        albums = [];

      for (var i in data) {
        data[i].label = i;
        albums.push(data[i]);
      }

      return deffer.resolve(albums);
    }, function () {
      return deffer.error(new Error('Error, no data.'));
    });

    return deffer.promise;
  }

  function _getGenre(album) {
    return album.genre.join(',');
  }

  function _getAlbumByName(album, artist) {
    return _getAlbumsForArtist(artist)
      .then(function (data) {
        var dataLen = data.length;
        for (var i = 0; i < dataLen; i++) {
          if (data[i].label == album) {
            return data[i];
          }
        }
      });
  }

  return {
    getAlbumsForArtist: _getAlbumsForArtist,
    getGenre: _getGenre,
    getAlbumByName: _getAlbumByName
  };
}

module.exports = albumService;
