app.service('artistService', ['$http', '$q', function($http, $q) {
    var apiUrl = '/api/';

    return {
        getArtists: function() {
            var deffer = $q.defer();
            $http({
                method: 'GET',
                url: apiUrl + 'artists.json'
            }).success(function(data) {
                var artists = [];
                for(var i in data) {
                    artists.push({
                        name: data[i],
                        label: i
                    });
                }
                return deffer.resolve(artists);
            }).error(function() {
                return deffer.error(new Error('Error, no data.'));
            });
            return deffer.promise;
        }
    };
}]);
