var ko = require('knockout');

function DropShadow(dropShadow) {
    this._enabled = ko.observable(dropShadow ? dropShadow._enabled() : false);
    this.color = ko.observable(dropShadow ? dropShadow.color() : "#aaaaaa");
    this.height = ko.observable(dropShadow ? dropShadow.height() : 5.0);
}

module.exports = DropShadow;
