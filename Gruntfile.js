module.exports = function(grunt) {
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-modernizr');
    
    var taskConfig = {
        
        pkg: grunt.file.readJSON("package.json"),
                
        less: {
            build: {
                files: {
                    "style.css": "style.less"
                }
            }
        },
        
        autoprefixer: {
            build: {
                files: {
                    "style.css": "style.css"
                }
            }
        },
        
        browserify: {
            build: {
                src: [ "scripts/download.js" ],
                dest: "script.js"
            }
        },
        
        uglify: {
            build: {
                files: {
                    "script.min.js": [ "script.js" ]
                }
            }
        },
        
        modernizr: {
            build: {
                devFile: "modernizr-dev.js",
                outputFile: "modernizr-custom.min.js"
            }
        }
        
    };
    
    grunt.initConfig(taskConfig);
    
    grunt.registerTask("dev", [ "less", "autoprefixer", "browserify", "modernizr" ]);
    grunt.registerTask("build", [ "less", "autoprefixer", "browserify", "uglify", "modernizr" ]);
    
};