var MappedStyle = require('./mappedStyle'),
    Border = require('./common/border'),
    Gradient = require('./common/gradient'),
    Text = require('./common/text'),
    Shadow = require('./common/shadow'),
    BackgroundImage = require('./common/backgroundImage'),
    BackgroundColor = require('./common/color');

function TextFieldStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [copy]);
    this.title = new Text(copy ? copy.title : undefined);
    this.backgroundColor = new BackgroundColor(copy ? copy.backgroundColor : undefined);
    this.backgroundGradient = new Gradient(copy ? copy.backgroundGradient : undefined);
    this.backgroundImage = new BackgroundImage(copy ? copy.backgroundImage : undefined);
    this.border = new Border(copy ? copy.border : undefined);
    this.innerShadow = new Shadow(copy ? copy.innerShadow : undefined);
    this.outerShadow = new Shadow(copy ? copy.outerShadow : undefined);
}

module.exports = TextFieldStyle;
