'use strict';

var LIVERELOAD_PORT = 35729;
var livereloadSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
      watch: {
        scripts: {
            files: [
                'game/**/*.js',
                '!game/main.js'
              ],
            options: {
        			spawn: false,
        			livereload: LIVERELOAD_PORT
        		},
        		tasks: ['build']
        	}
        },
        connect: {
        	options: {
        		port: 9000,
        		hostname: 'localhost'
        	},
        	livereload: {
        		options: {
        			middleware: function (connect) {
        				return [
                            livereloadSnippet,
                            mountFolder(connect, 'dist')
        				];
        			}
        		}
        	}
        },
        open: {
        	server: {
        		path: 'http://localhost:9000'
        	}
        },
        copy: {
        	dist: {
        		files: [
                    // includes files within path and its sub-directories
                    { expand: true, src: ['assets/**'], dest: 'dist/' },
                    { expand: true, flatten: true, src: ['game/plugins/*.js'], dest: 'dist/js/plugins/' },
                    { expand: true, src: ['css/**'], dest: 'dist/' },
                    { expand: true, src: ['index.html'], dest: 'dist/' }
        		]
        	}
        },
        browserify: {
        	build: {
        		src: ['game/main.js'],
        		dest: 'dist/js/game.js'
        	}
        }
	});

    grunt.registerTask('build', ['browserify','copy']);
    grunt.registerTask('serve', ['build', 'connect:livereload', 'open', 'watch']);
    grunt.registerTask('default', ['serve']);
    grunt.registerTask('prod', ['build', 'copy']);

};
