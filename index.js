var criticalPath = require('./criticalPath');

var Transform = require('readable-stream/transform');
var tryit = require('tryit');
var BufferStreams = require('bufferstreams');
var objectAssign = require('object-assign');
var gutil = require('gulp-util');

module.exports = function gulpHtmlmin(options) {
    return new Transform({
        objectMode: true,
        transform: function htmlminTransform(file, enc, cb) {
            if (file.isNull()) {
                cb(null, file);
                return;
            }

            function minifyHtml(buf, done) {
                var result;
                var data = String(buf);

                tryit(function () {
                    var usedClasses = {};
                    var resultAsString = criticalPath.removeUnusedClassesFromCss(data, options.criticalClasses);
                    result = new Buffer(resultAsString, options);
                    done(null, result);
                }, function (err) {
                    if (err) {
                        options = objectAssign({}, options, {fileName: file.path});
                        done(new gutil.PluginError('gulp-htmlmin', err, options));
                    }
                });
            }

            var self = this;

            if (file.isStream()) {
                file.contents.pipe(new BufferStreams(function (none, buf, done) {
                    minifyHtml(buf, function (err, contents) {
                        if (err) {
                            self.emit('error', err);
                            done(err);
                        } else {

                            done(null, contents);
                            file.contents = contents;
                            self.push(file);
                        }
                        cb();
                    });
                }));
                return;
            }
        }
    });
};