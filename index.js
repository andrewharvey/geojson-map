var through = require('through'),
    Combiner = require('stream-combiner'),
    geojsonStream = require('geojson-stream');

module.exports = stream;
module.exports.map = map;

function stream(fn) {
    return Combiner(geojsonStream.parse(),
        through(function(feature, callback) {
            this.queue(retag(feature, fn));
        }),
        geojsonStream.stringify());
}

function map(feature, fn) {
    return fn(feature);
}
