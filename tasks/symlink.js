/*
 * grunt-symlink
 * https://github.com/geddesign/grunt-symlink
 *
 * Copyright (c) 2012 Dave Geddes
 * Licensed under the MIT license.
 */

 var fs = require('fs');

module.exports = function(grunt) {
  grunt.registerTask('symlink', 'Create symlinks.', function() {
    var links = grunt.config.get("symlink.links");
    links.forEach(function(link){
      try{
        fs.symlinkSync(link.to, link.link, link.type || 'file');
        var rel = link.link.substr(0, link.link.lastIndexOf('/') + 1);
        grunt.log.ok('created symlink at ' + link.link + 
          ' that points to ' + link.to +
          ' (relative to ' + rel +')'
        );
      }
      catch(e){
        if (e.code === 'EEXIST') grunt.log.error(link.link + ' already exists, skipping');
      }
    });
  });
};
