# grunt-symlink
Automate the creation of project symlinks. This is especially useful as part of a build process, where you often want to symlink to large media folders rather than include them in the build.

For example say you have a videos folder you'd like to exclude from your requirejs build because including it makes the build take forever. No problem, use symlinks instead. But creating these symlinks manually every time you run your build would be a pain. Let grunt-symlink handle it. 

## Getting Started
Install this grunt plugin next to your project's [Gruntfile][getting_started] with: `npm install grunt-symlink`

Then add this line to your project's Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-symlink');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
In your Gruntfile add: 

```js
symlink: {
  images: {
    dest: 'path/to/new/symlink',
    relativeSrc: '../path/to/original',
    options: {type: 'dir'} // 'file' by default
  }
}
```
 **Important**: `dest` is relative to your project's root directory, but `relativeSrc` is relative to `dest`. For example:

```js
symlink: {
  images: {
    dest: 'frontend-build/videos',
    relativeSrc: '../videos',
    options: {type: 'dir'}
  }
}
```

So in this case `grunt-symlink` will create a new symlink at `myproject/frontend-build/videos` that points to `myproject/videos`, because `relativeSrc` in this case is relative to the `frontend-build` directory. 

`type` can either be `dir`, `file` (default), or `junction`. See [Node docs on symlinks](http://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Test your code using [grunt][grunt].

## License
Copyright (c) 2012 Dave Geddes  
Licensed under the MIT license.
