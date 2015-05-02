'use strict';

var grunt = require('grunt'),
  mmd = require('musicmetadata'),
  fs = require('fs'),
  btoa = require('btoa');

grunt.task.registerTask('parseApi', 'Api automatic parser', function () {
  var config = grunt.config.get('parseApi'),
    done = this.async(),
    files = [],
    global = [],
    artists = {},
    albums = {},
    tracks = {},
    startTime = Date.now();

  grunt.file.recurse(config.basePath, function (abspath) {
    if (/\.mp3$/.test(abspath)) {
      files.push(abspath);
    }
  });

  var totalFiles = files.length, i = 0;

  function getID3() {
    var filepath = files.shift(),
      stream = fs.createReadStream(filepath),
      parser = mmd(stream);

    console.log((i++) + '/' + totalFiles + ' done...');
    console.log('Reading ID3 tags for: ' + filepath);

    parser.on('done', function (err) {
      if (!err && parser.metadata) {
        global.push({
          id3: parser.metadata,
          path: filepath
        });
      }
      files.length ? getID3() : parseGlobal();
      stream.destroy();
    });
  }
  getID3();

  function formatName(name) {
    return name.toLowerCase().replace(/[^\w+]/gi, '');
  }

  function getPicture(data, formatAlbum) {
    var image = data[0];
    if (!image) {
      return '';
    }

    var base64String = "";
    for (var i = 0; i < image.data.length; i++) {
      base64String += String.fromCharCode(image.data[i]);
    }
    var imageFormat = /\.(jpg|png|gif|bmp)$/i.test(image.format) ? image.format : '.jpg';
    var path = 'api/pictures/' + formatAlbum + '.' + imageFormat;
    grunt.file.write(path, btoa(base64String), {
      encoding: 'base64'
    });
    return path;
  }

  function parseGlobal() {
    var len = global.length;
    for (var i = 0; i < len; i++) {
      var id3 = global[i].id3,
        artist = id3.artist.length == 1 && id3.artist[0];

      if (!artist) {
        continue;
      }

      // Artists
      var formatArtist = formatName(artist);

      if (!artists[formatArtist]) {
        artists[formatArtist] = artist;
      }

      // Albums
      var formatAlbum = formatArtist + '-' + formatName(id3.album);
      if (!albums[formatArtist]) {
        albums[formatArtist] = {};
      }
      if (!albums[formatArtist][formatAlbum]) {
        albums[formatArtist][formatAlbum] = {
          name: id3.album,
          year: id3.year,
          genre: id3.genre,
          picture: getPicture(id3.picture, formatAlbum)
        };
      }

      // Tracks
      var formatTrack = formatName(id3.title);
      if (!tracks[formatAlbum]) {
        tracks[formatAlbum] = {};
      }
      if (!tracks[formatAlbum][formatTrack]) {
        tracks[formatAlbum][formatTrack] = {
          title: id3.title,
          duration: id3.duration,
          track: id3.track,
          disk: id3.disk,
          path: global[i].path
        }
      }
    }
    for (var i in albums) {
      grunt.file.write('api/albums/' + i + '.json', JSON.stringify(albums[i]));
    }
    for (var i in tracks) {
      grunt.file.write('api/tracks/' + i + '.json', JSON.stringify(tracks[i]));
    }
    grunt.file.write('api/artists.json', JSON.stringify(artists));

    var elapsed = (Date.now() - startTime) / 1000;

    console.log('Success, parsing tooks: ' + elapsed + 's');
    done();
  }
});
