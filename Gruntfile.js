module.exports = function(grunt) {
  grunt.initConfig({
    
    symlink: {
      images: {
        dest: 'test/symlinks/images',
        relativeSrc: '../images',
        options: {type: 'dir'}
      }
    },

    watch: {
      mocha: {
        files: 'test/**/*.js',
        tasks: ['mocha']
      }
    }
  });

  //run tests
  grunt.registerTask('mocha', function(){
    var done = this.async();
    var spawn = require('child_process').spawn;
    //run task and use parent's stdio
    var mocha = spawn('mocha', ['test'], {stdio: 'inherit'});
    mocha.on('exit', function(){
      done();
    });
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('test', ['symlink', 'mocha']);
};
