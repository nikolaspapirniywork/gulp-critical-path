var File = require('vinyl');
var bufferToStream = require('simple-bufferstream');
var criticalPath = require('../index.js');
var fs = require('fs');
var expect = require('chai').expect;


describe('gulp-critical-path', function () {
    it('should exctract critical path classes', function (done) {
        runTest({
            folder: 'css',
            criticalClasses: '---critical'
        }, done);
    });

    it('should extract critical path classes with media queries', function (done) {
        runTest({
            folder: 'media',
            criticalClasses: '---critical'
        }, done);
    });

    it('should extract critical path classes with different critical class name', function (done) {
        runTest({
            folder: 'differentCriticalName'
        }, done);
    });

    it('should remove font face css', function (done) {
        runTest({
            folder: 'fonts'
        }, done);
    });

    it('should remove charset from css', function (done) {
        runTest({
            folder: 'charset'
        }, done);
    });

    function runTest(options, done) {
        var contents = fs.readFileSync('test/data/' + options.folder + '/given.css', 'utf8');
        var expected = fs.readFileSync('test/data/' + options.folder + '/expected.css', 'utf8');

        var criticalPathCss = '---ini';

        if (options.criticalClasses)
            criticalPathCss = options.criticalClasses;

        criticalPath({
            criticalClasses: criticalPathCss
        })
            .on('error', done)
            .on('data', function (file) {
                expect(String(file.contents)).to.equal(expected);
                done();
            })
            .end(new File({contents: bufferToStream(contents)}));
    }
});
