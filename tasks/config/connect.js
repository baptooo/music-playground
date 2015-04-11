'use strict';

module.exports = function (grunt) {
  var fs = require('fs'),
    url = require('url');

  grunt.config.set('connect', {
    options: {
      hostname: '<%= userConfig.hostname || "localhost" %>',
      port: '<%= userConfig.port || 1990 %>',
      base: '<%= buildConfig.paths.app %>',
      middleware: function (connect, options, middlewares) {
        var re = /\/track\/\?path=/i,
          userConfig = grunt.config.get('userConfig'),
          basePathRe = new RegExp(userConfig.basePath, 'i');

        middlewares.push(function (req, res, next) {
          var escapedURL = decodeURI(req.url);
          if (escapedURL.match(basePathRe) && escapedURL.match(re)) {
            var filePath = url.parse(escapedURL, true).query.path,
              stat = fs.statSync(filePath);

            res.writeHead(200, {
              'Content-Type': "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
              'Content-Length': stat.size,
              'Content-Disposition': 'filename="' + filePath + '"',
              'X-Pad': 'avoid browser bug',
              'Cache-Control': 'no-cache',
              'Content-Range': 'bytes ' + (stat.size / 10 << 0) + '-' + (stat.size - 1) + '/' + stat.size,
              'Accept-Ranges': "bytes"
            });
            console.log('User asked for: ' + filePath);

            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
          } else {
            return next();
          }
        });

        middlewares = middlewares.concat([
          connect.static(grunt.config.get('buildConfig.paths.app')),
          connect().use(
            '/api',
            connect.static('./api')
          )
        ]);

        return middlewares;
      }
    },
    dev: {},
    dist: {
      options: {
        keepalive: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
};