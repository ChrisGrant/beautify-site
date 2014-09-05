module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-config');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-gh-pages');

    var taskConfig = {

        pkg: grunt.file.readJSON("package.json"),

        config: {
          global: {
            options: {
              variables: {
                'outputFolder': 'build/'
              }
            }
          }
        },

        copy: {
          dev: {
                files: [
	                {
	                    src: ['*.html', '*.ico', 'images/**/*.*', 'CNAME', '*.css'],
	                    dest: '<%= grunt.config.get("outputFolder") %>'
	                }
                ]
              }
        },

        includereplace: {
            dist: {
              src: '*.html',
              dest: '<%= grunt.config.get("outputFolder") %>'
            }
        },

        less: {
            build: {
                files: {
                    '<%= grunt.config.get("outputFolder") %>style.css': "style.less"
                }
            }
        },

        autoprefixer: {
            build: {
                files: {
                    '<%= grunt.config.get("outputFolder") %>style.css': '<%= grunt.config.get("outputFolder") %>style.css'
                }
            }
        },

        browserify: {
            build: {
                src: [ "scripts/download.js" ],
                dest: '<%= grunt.config.get("outputFolder") %>script.js'
            }
        },

        uglify: {
            build: {
                files: {
                    '<%= grunt.config.get("outputFolder") %>script.min.js': '<%= grunt.config.get("outputFolder") %>script.js'
                }
            }
        },

        modernizr: {
            build: {
                devFile: "modernizr-dev.js",
                outputFile: '<%= grunt.config.get("outputFolder") %>modernizr-custom.min.js'
            }
        },

        watch: {
            build: {
                files: ['*.html', 'style.css', 'images/**/*.*', 'less/**/*.*', 'scripts/**/*.*', '_includes/**/*.*'],
                tasks: ["config", "copy", "includereplace", "less", "autoprefixer", "browserify", "modernizr", "watch"]
            }
        },

        'gh-pages': {
            options: {
                base: '<%= grunt.config.get("outputFolder") %>'
            },
            src: ['**']
        }
    };

    grunt.initConfig(taskConfig);

    grunt.registerTask("common", ["config", "copy", "includereplace", "less", "autoprefixer", "browserify", "modernizr"])

    grunt.registerTask("dev", ["common", "watch" ]);
    grunt.registerTask("build", ["common", "uglify"]);
    grunt.registerTask("release", ["common", "uglify", "gh-pages"]);
};
