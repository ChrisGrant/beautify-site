var ko = require('knockout');

function TextShadow(textShadow) {
    this._enabled = ko.observable(textShadow ? textShadow._enabled() : false);
    this.color = ko.observable(textShadow ? textShadow.color() : "#666666");
    this.offset = {
        x: ko.observable(textShadow ? textShadow.offset.x() : 0),
        y: ko.observable(textShadow ? textShadow.offset.y() : 3)
    };
}

module.exports = TextShadow;
