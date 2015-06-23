module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      dev: {
        options: {
          base: '.'
          , keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('server', function(target) {
    grunt.task.run([
      'connect:dev'
    ]);
  });

  grunt.registerTask('default', ['server']);  
};