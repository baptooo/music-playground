function artistService($http, $q, apiUrl) {

  function _getArtists() {
    var deffer = $q.defer();

    $http.get(apiUrl + '/artists.json', {
      cache: true
    }).then(function (response) {
      var data = response.data,
        artists = [];

      for (var i in data) {
        artists.push({
          name: data[i],
          label: i
        });
      }

      deffer.resolve(artists);
    }, function () {
      deffer.error(new Error('Error, no data.'));
    });

    return deffer.promise;
  }

  function _getArtistByName(name) {
    return this.getArtists()
      .then(function (data) {
        var dataLen = data.length;
        for (var i = 0; i < dataLen; i++) {
          if (data[i].label == name) {
            return data[i];
          }
        }
      });
  }

  return {
    getArtists: _getArtists,
    getArtistByName: _getArtistByName
  };
}

module.exports = artistService;
