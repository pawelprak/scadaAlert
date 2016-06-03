/*global  module, console */


module.exports = function (grunt) {
    'use strict';

    var date = '/*! Build date: <%= grunt.template.today() %> */\n';

    grunt.initConfig({

        clean: {
            build: {
                src: ['build']
            }
        },

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
                banner: date
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


    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');



    grunt.registerTask('default', ['copy:js', 'copy:css', 'uglify', 'cssmin']);



};