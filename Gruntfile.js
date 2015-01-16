module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ['build/*']
            }
        },

        concat: {
            js: {
                src: ['public/js/*.js', 'public/js/**/*.js'],
                dest: 'build/concat.js',
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'build/script.min.js': ['build/concat.js']
                }
            }
        },

        watch: {
            css: {
                files: 'public/css/*.css',
                tasks: ['cssmin']
            },
            js: {
                files: [
                    'public/js/**/*.js',
                    'public/js/*.js'
                ],
                tasks: ['jshint', 'uglify']
            }
        },

        browserSync: {
            bsFiles: {
                src: [
                    'public/css/*.css',
                    'public/js/**/*.js',
                    'public/js/*.js',
                    'public/*.html'
                ]
            },
            options: {
                proxy: 'localhost:3000',
                notify: false
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch', 'browserSync']
        },

        jasmine: {
            customTemplate: {
                src: [
                    'public/js/*.js',
                    'public/js/**/*.js'
                    ],
                options: {
                    specs: [
                        'spec/tests/*spec.js',
                        'spec/tests/patterns/*spec.js'
                        ],
                    helpers: 'spec/helpers/*Helper.js'
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('del', ['clean']);
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'concurrent']);

};
