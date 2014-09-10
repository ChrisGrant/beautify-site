var ko = require('knockout'),
    HighlightedStateViewModel = require('./highlightedStateViewModel'),
    NumericValueViewModel = require('./common/numericValueViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function SliderViewModel(style) {
    var self = this;
    this.model = style;
    ControlEditorViewModel.call(this, "Slider", [
        new HighlightedStateViewModel.Gradient(style, "thumbBackgroundGradient", "Thumb Background Gradient"),
        new HighlightedStateViewModel.Color(style, "thumbBackgroundColor", "Thumb Background Color"),
        new HighlightedStateViewModel.Shadow(style, "thumbInnerShadow", "Thumb Inner Shadow"),
        new HighlightedStateViewModel.Shadow(style, "thumbOuterShadow", "Thumb Outer Shadow"),
        new HighlightedStateViewModel.Border(style, "thumbBorder", "Thumb Border"),
        new NumericValueViewModel(style.barHeightFraction, "Bar Height Fraction", 0.1, 1.0),
        new HighlightedStateViewModel.Border(style, "barBorder", "Bar Border"),
        new HighlightedStateViewModel.Shadow(style, "barInnerShadow", "Bar Inner Shadow"),
        new HighlightedStateViewModel.Gradient(style, "minimumTrackBackgroundGradient", "Minimum Track Background Gradient"),
        new HighlightedStateViewModel.Color(style, "minimumTrackColor", "Minimum Track Color"),
        new HighlightedStateViewModel.Gradient(style, "maximumTrackBackgroundGradient", "Maximum Track Background Gradient"),
        new HighlightedStateViewModel.Color(style,  "maximumTrackColor", "Maximum Track Color"),
        new HighlightedStateViewModel.Shadow(style,  "barOuterShadow", "Bar Outer Shadow")
    ]);
}

module.exports = SliderViewModel;
