var ko = require('knockout');

function Color(color) {
    this.color = ko.observable(color ? color.color() : "#00000000");
}

module.exports = Color;
