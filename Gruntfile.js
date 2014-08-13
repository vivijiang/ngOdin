module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: true,
        compress: false,
        beautify: true
      }
    },
    concat: {
      options: {
        // separator: ';',
        stripBanners: true
      },
      libjs: {
        src: [
          'bower_components/angular/angular.min.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/ng-grid/ng-grid-2.0.12.debug.js'
        ],
        dest: 'dist/lib.js',
      },
      ngodin: {
        src: [
          'private/javascripts/ng-odin/**'
        ],
        dest: 'dist/ngodin.js',
      },
      sitejs: {
        src: [
          'private/javascripts/app/**'
        ],
        dest: 'dist/main.js',
      },
      css: {
        src: [
          // 'bower_components/jquery/dist/jquery.min.js',
          // 'bower_components/angular/angular.min.js',
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'bower_components/ng-grid/ng-grid.min.css'
        ],
        dest: 'dist/site.css',
      }
    },
    copy: {
      js: {
        expand: true,
        src: 'dist/*.js',
        dest: 'public/javascripts',
        filter: 'isFile',
        flatten: true
      },
      css: {
        expand: true,
        src: 'dist/*.css',
        dest: 'public/stylesheets',
        filter: 'isFile',
        flatten: true
      },
      font: {
        expand: true,
        src: 'bower_components/bootstrap/dist/fonts/*',
        dest: 'public/fonts',
        filter: 'isFile',
        flatten: true
      }
    },
    clean: {
      dist: ['dist'],
      site: ['public/javascripts/', 'public/stylesheets/', 'public/fonts/']
    }
  });



  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'copy']);

};