/*
  NOTE for symlinks to work on windows you have to run the cmd as administrator, or setup read permissions correctly. 
*/

var grunt = require('grunt');
var fs = require('fs');
require("should");

describe('grunt-symlink', function(){
  var linkPath = 'test/symlinks/images';

  after(function(){
    fs.unlinkSync(linkPath);
  });

  it('creates symlinks based on links config', function(){
    fs.existsSync(linkPath).should.be.true;
    fs.lstatSync(linkPath).isSymbolicLink().should.be.true;
  });

  it('symlink should work', function(){
    fs.existsSync(linkPath + '/cat.jpeg').should.be.true;
  });  
});