var MappedStyle = require('./mappedStyle'),
    Gradient = require('./common/gradient'),
    BackgroundImage = require('./common/backgroundImage'),
    BackgroundColor = require('./common/color');

function ViewControllerStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [copy]);
    this.backgroundColor = new BackgroundColor(copy ? copy.backgroundColor : undefined);
    this.backgroundGradient = new Gradient(copy ? copy.backgroundGradient : undefined);
    this.backgroundImage = new BackgroundImage(copy ? copy.backgroundImage : undefined);
}

module.exports = ViewControllerStyle;
