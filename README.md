grunt-file-wrap
===============

Uses [text-wrap] to add a header + footer into your text files.

## Installing

```
$ npm install grunt-file-wrap --save-dev
```

## Example

```js
module.exports = function (grunt) {
    grunt.initConfig({
        fileWrap: {
            regular: {
                header: 'header.txt',
                footer: 'footer.txt',
                files: {
                    // matching input and output will rewrite the source file;
                    "output1.txt": "input1.txt",
                    "output2.txt": "input2.txt"
                },
                options: {
                    // skipCheck, unique
                }
            },
            withCwd: {
                header: 'header.txt',
                footer: 'footer.txt',
                src: ["files/*.txt"],
                dest: "out/",
                cwd: "./", // current working directory
                options: {
                    // skipCheck, unique
                }
            },
            withRewrite: {
                // in order to rewrite the source files,
                // simply skip property 'dest': 
                header: 'header.txt',
                footer: 'footer.txt',
                src: ["files/*.txt"],
                options: {
                    // skipCheck, unique
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-file-wrap');
    grunt.registerTask('default', ['fileWrap']);
};
```

## Options

Options, as supported by [text-wrap]:

* [skipCheck]
* [unique]

## License

Copyright © 2016 [Vitaly Tomilov](https://github.com/vitaly-t);
Released under the MIT license.

[text-wrap]:https://github.com/vitaly-t/text-wrap
[skipCheck]:https://github.com/vitaly-t/text-wrap#optionsskipcheck--boolean
[unique]:https://github.com/vitaly-t/text-wrap#optionsunique--boolean
