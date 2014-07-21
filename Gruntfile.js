module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-gh-pages');

	  var devOutputFolder = 'build/';

    var taskConfig = {

        pkg: grunt.file.readJSON("package.json"),

        copy: {
          dev: {
                files: [
	                {
	                    src: ['*.html', '*.ico', 'images/**/*.*', 'CNAME', '*.js', '*.css'],
	                    dest: devOutputFolder
	                }
                ]
              }
        },

        includereplace: {
            dist: {
              src: '*.html',
              dest: "build/"
            }
        },

        less: {
            build: {
                files: {
                    "build/style.css": "style.less"
                }
            }
        },

        autoprefixer: {
            build: {
                files: {
                    "build/style.css": "build/style.css"
                }
            }
        },

        browserify: {
            build: {
                src: [ "scripts/download.js" ],
                dest: "build/script.js"
            }
        },

        uglify: {
            build: {
                files: {
                    "build/script.min.js": [ devOutputFolder + "script.js" ]
                }
            }
        },

        modernizr: {
            build: {
                devFile: "modernizr-dev.js",
                outputFile: "build/modernizr-custom.min.js"
            }
        },

        watch: {
            build: {
                files: ['*.html', 'style.css', 'images/**/*.*', 'less/**/*.*', 'scripts/**/*.*', '_includes/**/*.*'],
                tasks: ["copy", "includereplace", "less", "autoprefixer", "browserify", "modernizr", "watch"]
            }
        },

        'gh-pages': {
            options: {
                base: devOutputFolder
            },
            src: ['**']
        }

    };

    grunt.initConfig(taskConfig);

    grunt.registerTask("dev", [ "copy", "includereplace", "less", "autoprefixer", "browserify", "modernizr", "watch" ]);
    grunt.registerTask("build", [ "copy", "includereplace", "less", "autoprefixer", "browserify", "uglify", "modernizr" ]);
    grunt.registerTask("release", [ "copy", "includereplace", "less", "autoprefixer", "browserify", "uglify", "modernizr", "gh-pages"]);

};
