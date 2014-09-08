var MappedStyle = require('./mappedStyle'),
    ko = require('knockout'),
    Gradient = require('./common/gradient'),
    Border = require('./common/border'),
    SwitchState = require('./common/switchState'),
    BackgroundImage = require('./common/backgroundImage'),
    Shadow = require('./common/shadow'),
    BackgroundColor = require('./common/color');

function SwitchStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [copy]);
    this.onState = new SwitchState(copy ? copy.onState : undefined);
    this.offState = new SwitchState(copy ? copy.offState : undefined);

    this.thumbInset = ko.observable(copy ? copy.thumbInset() : 0.0);
    this.thumbBorder = new Border(copy ? copy.thumbBorder : undefined);
    this.highlightColor = new BackgroundColor(copy ? copy.highlightColor : undefined);
    this.thumbBackgroundImage = new BackgroundImage(copy ? copy.thumbBackgroundImage : undefined);
    this.thumbBackgroundColor = new BackgroundColor(copy ? copy.thumbBackgroundColor : undefined);
    this.thumbBackgroundGradient = new Gradient(copy ? copy.thumbBackgroundGradient : undefined);
    this.thumbInnerShadow = new Shadow(copy ? copy.thumbInnerShadow : undefined);
    this.thumbOuterShadow = new Shadow(copy ? copy.thumbOuterShadow : undefined);
    this.innerShadow = new Shadow(copy ? copy.innerShadow : undefined);
    this.outerShadow = new Shadow(copy ? copy.outerShadow : undefined);

    //TODO: change font to mimic button
    this.border = new Border(copy ? copy.border : undefined);
}

module.exports = SwitchStyle;
