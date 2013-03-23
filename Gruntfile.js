var fs = require('fs');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-release');
  
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

  //test suite setup
  grunt.registerTask('setup', function(){
    var dir = './test/symlinks';
    fs.mkdirSync(dir);
    grunt.log.ok('created ' + dir);
  });

  grunt.registerTask('teardown', function(){
    var done = this.async();
    var dir = './test/symlinks';
    var exec = require('child_process').exec;
    var child = exec('rm -rf test/symlinks --force',function(err,out) { 
      if (err) grunt.fail.warn(err);
      grunt.log.ok('deleted ' + dir);
      console.log(out); err && console.log(err); 
      done();
    });
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
  grunt.registerTask('test', ['setup', 'symlink', 'mocha', 'teardown']);
};
