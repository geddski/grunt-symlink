/*
 * grunt-symlink
 * https://github.com/geddesign/grunt-symlink
 *
 * Copyright (c) 2012 Dave Geddes
 * Licensed under the MIT license.
 */

var fs = require('fs');

module.exports = function(grunt) {
  grunt.registerMultiTask('symlink', 'Create symlinks.', function() {
    var options = this.options();
    var src = this.file.relativeSrc;
    var dest = this.file.dest;
    try{
      console.log('dest', dest);
      console.log('src', src);
      fs.symlinkSync(src, dest, options.type || 'file');
      var rel = dest.substr(0, dest.lastIndexOf('/') + 1);
      grunt.log.ok('created symlink at ' + dest + 
        ' that points to ' + src +
        ' (relative to ' + rel +')'
      );
    }
    catch(e){
      if (e.code === 'EEXIST'){
        return grunt.log.error(dest + ' already exists, skipping');
      }
      grunt.fail.warn(e);
    }
  });
};
