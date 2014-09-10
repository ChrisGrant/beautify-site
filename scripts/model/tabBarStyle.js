var MappedStyle = require('./mappedStyle'),
    Border = require('./common/border'),
    Gradient = require('./common/gradient'),
    Shadow = require('./common/shadow'),
    BackgroundImage = require('./common/backgroundImage'),
    Color = require('./common/color');

/**
 * Constructor takes option copy parameter.
 * @param copy
 * @returns
 */
function TabBarStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [copy]);
    this.backgroundColor = new Color(copy ? copy.backgroundColor : undefined);
    this.backgroundGradient = new Gradient(copy ? copy.backgroundGradient : undefined);
    this.backgroundImage = new BackgroundImage(copy ? copy.backgroundImage : undefined);
    this.border = new Border(copy ? copy.border : undefined);
    this.innerShadow = new Shadow(copy ? copy.innerShadow : undefined);
    this.outerShadow = new Shadow(copy ? copy.outerShadow : undefined);
    this.imageTintColor = new Color(copy ? copy.imageTintColor : undefined);
}

module.exports = TabBarStyle;
