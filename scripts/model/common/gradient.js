var ko = require('knockout'),
    Stop = require('./stop');

function Gradient(gradient) {
    this._enabled = ko.observable(gradient ? gradient._enabled() : false);
    this.radial = ko.observable(gradient ? gradient.radial() : false);
    this.angle = ko.observable(gradient ? gradient.angle() : undefined);

    // when cloning a gradient, make sure this is a 'deep clone', i.e. each stop should be cloned also
    var stops = [];
    if (gradient) {
        for (var i = 0; i < gradient.stops().length; i++) {
            var stop = gradient.stops()[i];
            stops.push(new Stop(stop));
        }
    } else {
        // provide a sensible default
        var stop1 = new Stop();
        stop1.position(0.0);
        stop1.color("#aaaaaa");
        stops.push(new Stop(stop1));
        var stop2 = new Stop();
        stop2.position(1.0);
        stop2.color("#ffffff");
        stops.push(new Stop(stop2));
    }

    this.stops = ko.observableArray(stops);

}

module.exports = Gradient;
