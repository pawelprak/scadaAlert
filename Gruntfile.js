/*global  module, console */


module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        copy: {
            js: {
                expand: true,
                cwd: 'source/js',
                src: '**',
                dest: 'build/js',
                flatten: true
            },
            css: {
                expand: true,
                cwd: 'source/css',
                src: '**',
                dest: 'build/css',
                flatten: true
            }
        },

        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                banner: '/*! \n<%= pkg.name %> <%= pkg.version %> \n\n' +
                    'Build date: <%= grunt.template.today() %> \n' +
                    'License: <%= pkg.license %> \n' +
                    'Author: <%= pkg.author.name %> \n' +
                    'Repository: <%= pkg.repository.url %> \n*/'
            },
            build: {
                files: {
                    'build/js/scadaAlert.min.js': ['source/js/scadaAlert.js']
                }
            }
        },

        cssmin: {
            options: {
                sourceMap: true
            },
            target: {
                files: {
                    'build/css/scadaAlert.min.css': ['source/css/scadaAlert.css']
                }
            }
        },

        compress: {
            main: {
                options: {
                    archive: 'scadaAlert.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: 'scadaAlert/'
            }
        },

        watch: {
            options: {
                nospawn: true
            },
            scripts: {
                files: 'source/js/scadaAlert.js',
                tasks: ['copy:js', 'uglify']
            },
            css: {
                files: 'source/css/scadaAlert.css',
                tasks: ['copy:css', 'cssmin']
            }
        }

    });



    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');



    grunt.registerTask('default', ['copy:js', 'copy:css', 'uglify', 'cssmin']);



};