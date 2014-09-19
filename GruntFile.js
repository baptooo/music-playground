'use strict';

var fs = require('fs'),
    url = require('url');

module.exports = function(grunt) {
    grunt.initConfig({
        userConfig: grunt.file.readJSON('userConfig.json'),
        sass: {
            dev: {
                options: {
                    sourcemap: true,
                    loadPath: ['bower_components/bootstrap-sass/lib', './']
                },
                files: {
                    'src/css/angular-sandbox.min.css': 'src/sass/main.scss'
                }
            }
        },
        connect: {
            dev: {
                options: {
                    hostname: '<%= userConfig.hostname || "localhost" %>',
                    port: '<%= userConfig.port || 1990 %>',
                    middleware: function(connect, options, middlewares) {
                        var re = /\/track\/\?path=/i,
                            userConfig = grunt.config.get('userConfig'),
                            basePathRe = new RegExp(userConfig.basePath, 'i');

                        middlewares.push(function(req, res, next) {
                            var escapedURL = decodeURI(req.url);
                            if(escapedURL.match(basePathRe) && escapedURL.match(re)) {
                                var filePath = url.parse(escapedURL, true).query.path,
                                    stat = fs.statSync(filePath);

                                res.writeHead(200, {
                                    'Content-Type': "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
                                    'Content-Length': stat.size,
                                    'Content-Disposition': 'filename="' + filePath + '"',
                                    'X-Pad': 'avoid browser bug',
                                    'Cache-Control': 'no-cache',
                                    'Content-Range': 'bytes ' + (stat.size / 10 << 0) + '-' + (stat.size - 1) + '/' + stat.size,
                                    'Accept-Ranges' : "bytes"
                                });
                                console.log('User asked: ' + filePath);

                                var readStream = fs.createReadStream(filePath);
                                readStream.pipe(res);
                            } else {
                                return next();
                            }
                        });

                        return middlewares;
                    }
                }
            }
        },
        watch: {
            sass: {
                files: 'src/sass/**/*.scss',
                tasks: ['sass:dev']
            },
            js: {
                files: 'src/js/**/*.js'
            },
            html: {
                files: ['index.html', 'src/views/**/*.html']
            }
        },
        clean: {
            api: ['api']
        },
        parseApi: {
            basePath: '<%= userConfig.basePath %>'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadTasks('tasks');

    grunt.registerTask('debug', ['sass', 'watch']);
    grunt.registerTask('server', ['connect:dev', 'sass', 'watch']);

    grunt.registerTask('api', ['clean:api', 'parseApi']);
}