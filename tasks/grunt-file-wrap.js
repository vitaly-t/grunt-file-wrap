'use strict';

var TextWrap = require('text-wrap');
var color = require('cli-color');
var path = require('path');

module.exports = function (grunt) {

    grunt.registerMultiTask('fileWrap', 'Adds header + footer.', function () {

        var files = this.data.files,
            header = this.data.header,
            footer = this.data.footer,
            opt = this.options(),
            tw = new TextWrap();

        if (files) {
            for (var f in files) {
                var src = files[f];
                checkFile(src);
            }
        }

        if (header) {
            if (opt.fileMode) {
                checkFile(header);
                tw.header = grunt.file.read(header);
            } else {
                tw.header = header;
            }
        }

        if (footer) {
            if (opt.fileMode) {
                checkFile(footer);
                tw.footer = grunt.file.read(footer);
            } else {
                tw.footer = footer;
            }
        }

        this.files.forEach(function (byDest) {
            var dest, cwd = byDest.cwd || '';
            if (byDest.dest) {
                dest = path.join(cwd, byDest.dest);
            }
            byDest.src.forEach(function (f) {
                var outFile, file = path.join(cwd, f);
                if (byDest.dest) {
                    outFile = grunt.file.isDir(dest) ? path.join(dest, f) : dest;
                } else {
                    outFile = file;
                }
                var text = grunt.file.read(file);
                var result = tw.wrap(text, opt);
                grunt.file.write(outFile, result);
                grunt.log.writeln(outFile + " - " + color.green("OK"));
            })
        });
    });

    function checkFile(file) {
        if (!grunt.file.exists(file)) {
            throw new Error("File '" + file + "' not found.");
        }
    }
};
