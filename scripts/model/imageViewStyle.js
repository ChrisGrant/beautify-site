var MappedStyle = require('./mappedStyle'),
    Border = require('./common/border'),
    Gradient = require('./common/gradient'),
    Shadow = require('./common/shadow'),
    BackgroundColor = require('./common/color');

function ImageViewStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [copy]);
    this.border = new Border(copy ? copy.border : undefined);

    this.backgroundColor = new BackgroundColor(copy ? copy.backgroundColor : undefined);
    this.backgroundGradient = new Gradient(copy ? copy.backgroundGradient : undefined);

    this.innerShadow = new Shadow(copy ? copy.innerShadow : undefined);
    this.outerShadow = new Shadow(copy ? copy.outerShadow : undefined);
}

module.exports = ImageViewStyle;
