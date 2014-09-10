var ko = require('knockout');

// stop - defaults to some reasonable value for the end-user

function Stop(stop) {
    this.position = ko.observable(stop && stop.position ? stop.position() : 1.0);
    this.color = ko.observable(stop && stop.color ? stop.color() : "#ffffff");
}

module.exports = Stop;
