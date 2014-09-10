var ko = require('knockout'),
    MappedStyle = require('./mappedStyle'),
    Gradient = require('./common/gradient'),
    Border = require('./common/border'),
    Shadow = require('./common/shadow'),
    BackgroundColor = require('./common/color');

function SliderStyle(copy) {
    "use strict";
    MappedStyle.apply(this, [ copy ]);

    this.barHeightFraction = ko.observable(copy ? copy.barHeightFraction() : 0.3);

    this.barBorder = new Border(copy ? copy.barBorder : undefined);
    this.thumbBorder = new Border(copy ? copy.thumbBorder : undefined);

    this.thumbBackgroundColor = new BackgroundColor(copy ? copy.thumbBackgroundColor : undefined);
    this.thumbBackgroundGradient = new Gradient(copy ? copy.thumbBackgroundGradient : undefined);

    this.minimumTrackColor = new BackgroundColor(copy ? copy.minimumTrackColor : undefined);
    this.minimumTrackBackgroundGradient = new Gradient(copy ? copy.minimumTrackBackgroundGradient : undefined);

    this.maximumTrackColor = new BackgroundColor(copy ? copy.maximumTrackColor : undefined);
    this.maximumTrackBackgroundGradient = new Gradient(copy ? copy.maximumTrackBackgroundGradient : undefined);

    this.thumbInnerShadow = new Shadow(copy ? copy.thumbInnerShadow : undefined);
    this.thumbOuterShadow = new Shadow(copy ? copy.thumbOuterShadow : undefined);
    this.barInnerShadow = new Shadow(copy ? copy.barInnerShadow : undefined);
    this.barOuterShadow = new Shadow(copy ? copy.barOuterShadow : undefined);
}

module.exports = SliderStyle;
