module.exports = function(grunt) {

  const sass = require('node-sass');
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
      sass: {
        options: {
          implementation: sass
          },
        dist: {
          files: {
            'build/css/main.css': 'sources/scss/main.scss'
          }
        }
      }, 

      postcss: {
        style: {
          options: {
            processors: [
              require('autoprefixer')('last 2 versions', 'IE 11', 'Firefox ESR')
            ]
          },
          src: 'build/css/*.css'
        }
      },

    watch: {
      options: {
        livereload: true,
      },
      style: {
        files: ['sources/scss/**/*.scss', 'sources/*.html'],
        tasks: ['sass', 'postcss', 'csso', 'copy:html', 'copy:js']
      }
    }, 

      browserSync: {
      server: {
        bsFiles: {
          src: [
            'build/*.html',
            'build/css/*.css'
          ]
        },
        options: {
          server: 'build/',
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    svgstore: { 
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
        'build/images/sprite.svg': ['sources/images/icons/icon-*.svg']
       }
      }
    }, 

    csso: {
      style: {
        options: {
          report: 'gzip'
        },
        files: {
         'build/css/main.min.css': ['build/css/main.css']
        }
      }
    }, 

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },

        files: [{
          expand: true,
          src: ['build/images/**/*.{png,jpg,svg}']
        }]
      }
    },

    copy: {
      build: {
        files: [{
         expand: true,
          cwd: 'sources',
          src: [
            'fonts/**/*.{woff,woff2}',
            'images/**',
            'js/**/bootstrap.min.js',
            '*.html'
          ],
         dest: 'build'
        }] 
      },

      html: {
        files: [{
          expand: true,
          cwd: 'sources',
          src: [
            '*.html'
          ],

          dest: 'build'
        }]
      },

      js: {
        files: [{
          expand: true,
          cwd: 'sources',
          src: [
            'js/**/*.js'
          ],

          dest: 'build'
        }]
      }
    }, 

    uglify: {
      js: {
        files: {
          'build/js/script.min.js': ['build/js/script.js']
        }
      }
    },

    clean: {
      build: ['build']
    }
  });

  grunt.registerTask('svg', ['svgstore']);

  grunt.registerTask('serve', ['browserSync', 'watch']);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'postcss',
    'csso',
    'uglify',
    'imagemin',
    'svgstore'
  ]);

  grunt.registerTask('build-light', [
    'clean',
    'copy',
    'sass',
    'postcss',
    'csso',
    'imagemin'
  ]);
};