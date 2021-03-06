module.exports = function(grunt) {
  var config = {};

  // Put your JavaScript library dependencies here. e.g. jQuery, underscore,
  // etc.
  // You'll also have to install them using a command similar to:
  //     npm install --save jquery
  var VENDOR_LIBRARIES = [
    'd3',
    'underscore'
  ];

  config.browserify = {
    options: {
      browserifyOptions: {
        debug: true
      }
    },
    app: {
      src: ['js/src/app.js'],
      dest: 'js/app.min.js',
      options: {
        plugin: [
          [
            'minifyify', {
              map: 'app.min.js.map',
              output: './js/app.min.js.map'
            }
          ]
        ],
        transform: [
          [
            'babelify', {
              presets: ['es2015']
            }
          ]
        ]
      }
    }
  };

  // Check if there are vendor libraries and build a vendor bundle if needed
  if (VENDOR_LIBRARIES.length) {
    config.browserify.app.options = config.browserify.app.options || {};
    config.browserify.app.options.exclude = VENDOR_LIBRARIES;

    config.browserify.vendor = {
      src: [],
      dest: 'js/vendor.min.js',
      options: {
        plugin: [
          [
            'minifyify', {
              map: 'vendor.min.js.map',
              output: './js/vendor.min.js.map'
            }
          ]
        ],
        require: VENDOR_LIBRARIES
      }
    };
  }

  config.sass = {
  options: {
    outputStyle: 'compressed',
    sourceMap: true,
    includePaths: [ 'sass/', 'node_modules/trib-styles/sass/' ]
  },
  app: {
    files: {
      'css/styles.css': 'sass/styles.scss'
    }
  }
};

  config.watch = {
    sass: {
      files: ['sass/**/*.scss'],
      tasks: ['sass']
    },
    js: {
      files: ['js/src/**/*.js'],
      tasks: ['browserify:app']
    }
  };



  config.svgstore = {
       options: {
         prefix : '', // This will prefix each <g> ID
         cleanup : 'false' // Should remove all inline styles
       },
       default : {
           files: {
             'img/nfl-icon-defs.svg': ['svg/*.svg']
           }
       }
   };
  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-sass');  
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var defaultTasks = [];

  defaultTasks.push('sass');
  defaultTasks.push('browserify');
  defaultTasks.push('svgstore');


  grunt.registerTask('default', defaultTasks);
};