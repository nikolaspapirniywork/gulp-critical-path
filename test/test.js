var File = require('vinyl');
var bufferToStream = require('simple-bufferstream');
var criticalPath = require('../index.js');
var fs = require('fs');
var expect = require('chai').expect;


describe('gulp-critical-path', function () {
    it('should exctract critical path classes', function (done) {
        var contents = fs.readFileSync('test/data/css/style.css', 'utf8');
        var expected = fs.readFileSync('test/data/css/expected.css', 'utf8');

        criticalPath({
            criticalClasses: '---critical'
        })
            .on('error', done)
            .on('data', function (file) {
                expect(String(file.contents)).to.equal(expected);
                done();
            })
            .end(new File({contents: bufferToStream(contents)}));
    });

    it('should extract critical path classes with media queries', function (done) {
        var contents = fs.readFileSync('test/data/media/style.css', 'utf8');
        var expected = fs.readFileSync('test/data/media/expected.css', 'utf8');

        criticalPath({
            criticalClasses: '---critical'
        })
            .on('error', done)
            .on('data', function (file) {
                expect(String(file.contents)).to.equal(expected);
                done();
            })
            .end(new File({contents: bufferToStream(contents)}));
    });

    it('should extract critical path classes with different critical class name', function (done) {
        var contents = fs.readFileSync('test/data/differentCriticalName/style.css', 'utf8');
        var expected = fs.readFileSync('test/data/differentCriticalName/expected.css', 'utf8');

        criticalPath({
            criticalClasses: '---ini'
        })
            .on('error', done)
            .on('data', function (file) {
                expect(String(file.contents)).to.equal(expected);
                done();
            })
            .end(new File({contents: bufferToStream(contents)}));
    });
});
