var MappedStyle = require('./mappedStyle'),
    Text = require('./common/text'),
    TextShadow = require('./common/textShadow'),
    BackgroundImage = require('./common/backgroundImage'),
    Color = require('./common/color'),
    Gradient = require('./common/gradient'),
    DropShadow = require('./common/dropShadow');

function NavigationBarStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [copy]);
    this.title = new Text(copy ? copy.title : null);
    this.titleShadow = new TextShadow(copy ? copy.titleShadow : null);
    this.backgroundImage = new BackgroundImage(copy ? copy.backgroundImage : null);
    this.backgroundColor = new Color(copy ? copy.backgroundColor : null);
    this.backgroundGradient = new Gradient(copy ? copy.backgroundGradient : null);
    this.dropShadow = new DropShadow(copy ? copy.dropShadow : null);
    this.tintColor = new Color(copy ? copy.tintColor : undefined);
}

module.exports = NavigationBarStyle;
