var ko = require('knockout');

function Border(border) {
    this._enabled = ko.observable(border ? border._enabled() : false);
    this.width = ko.observable(border ? border.width() : 2.0);
    this.color = ko.observable(border ? border.color() : "#666666");
    this.cornerRadius = ko.observable(border ? border.cornerRadius() : 5.0);
}

module.exports = Border;
