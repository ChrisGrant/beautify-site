var ko = require('knockout');

function BackgroundImage(backgroundImage) {

    self = this;
    this._enabled = ko.observable(backgroundImage ? backgroundImage._enabled() : false);
    this.data = ko.observable(backgroundImage ? backgroundImage.data() : undefined);
    this.contentMode = ko.observable(backgroundImage ? backgroundImage.contentMode() : undefined);
}

module.exports = BackgroundImage;
