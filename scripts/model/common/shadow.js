var ko = require('knockout');

function Shadow(shadow) {
	this._enabled = ko.observable(shadow ? shadow._enabled() : false);
    this.color = ko.observable(shadow ? shadow.color() : "#AAAAAA");
    this.radius = ko.observable(shadow ? shadow.radius() : 2);
    this.offset = {
        x: shadow ? shadow.offset.x : ko.observable(0),
        y: shadow ? shadow.offset.y : ko.observable(2)
    };
}

module.exports = Shadow;
