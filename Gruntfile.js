// export the function for grunt to hook in to
// this is how grunt pulls in all the settings you've provided below!
module.exports = function(grunt) {

  // the bread and butter of a Gruntfile - the config
  grunt.initConfig({

    // this loads the contents of package.json so you can use the fields within
    pkg: grunt.file.readJSON('package.json'),

    // all the settings concerning using grunt-contrib-concat
    concat: {
      scripts: {
        src: [
          'scripts/libs/*.js', // grab all of the JS files in the libs folder
          'scripts/main.js' // grab our main.js file
        ],
        dest: 'scripts/build/combined.js' // where to output the file after combining
      },
      styles: {
        src: [
          'styles/libs/*.css',
          'styles/main.css'
        ],
        dest: 'styles/build/combined.css'
      }
    },

    // all the settings for grunt-contrib-uglify
    uglify: {
      build: {
        src: 'scripts/build/combined.js', // the js file to uglify
        dest: 'scripts/build/combined.min.js' // where to output the uglified file
      }
    },

    // settings for autoprefixer
    autoprefixer: {
      // setting the options for the autoprefixer command
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'] // add css prefixes so these browsers can support features
      },
      build: {
        src: 'styles/build/combined.css', // file to autoprefix
        dest: 'styles/build/combined.prefixed.css' // where to put it
      }
    },

    // settings for grunt-contrib-watch
    watch: {
      // name of the command
      scripts: {
        files: ['scripts/*.js'], // watch all of these files for changes
        tasks: ['concat:scripts', 'uglify'] // if any of them change, do this!
      },
      styles: {
        files: ['styles/*.css'],
        tasks: ['concat:styles', 'autoprefixer']
      }
    },

    // settings for the browsersync command
    browserSync: {
      // the files browsersync should watch to refresh our browser
      bsFiles: {
        src: [
          'index.html',
          'scripts/build/*.js',
          'styles/build/*.css'
        ]
      },
      options: {
        watchTask: true, // tell browsersync we're also watching files, very important!
        server: './' // where to serve files from for development
      }
    }
  });

  // where all the libraries we've installed get loaded
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');

  // register grunt tasks: the first item is the name of the task
  // the list contains what commands will be called
  grunt.registerTask('default', ['concat', 'uglify', 'autoprefixer']);
  grunt.registerTask('dev', ['default', 'browserSync', 'watch']);
};
