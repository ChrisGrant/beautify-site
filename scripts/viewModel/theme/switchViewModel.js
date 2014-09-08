var ko = require('knockout'),
    HighlightedStateViewModel = require('./highlightedStateViewModel'),
    NumericValueViewModel = require('./common/numericValueViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function SwitchViewModel(style) {
    var self = this;
    this.model = style;
    ControlEditorViewModel.call(this, "Switch", [
        new HighlightedStateViewModel.Border(style, "thumbBorder", "Thumb Border"),
        new NumericValueViewModel(style.thumbInset, "Thumb Inset", 0, 25, "px"),
        new HighlightedStateViewModel.Shadow(style, "thumbInnerShadow", "Thumb Inner Shadow"),
        new HighlightedStateViewModel.Gradient(style, "thumbBackgroundGradient", "Thumb Background Gradient"),
        new HighlightedStateViewModel.Color(style, "thumbBackgroundColor", "Thumb Background Color"),
        new HighlightedStateViewModel.Shadow(style,"thumbOuterShadow", "Thumb Outer Shadow"),
        new HighlightedStateViewModel.Border(style, "border", "Border"),
        new HighlightedStateViewModel.Shadow(style, "innerShadow", "Inner Shadow"),
        new HighlightedStateViewModel.Color(style, "highlightColor", "Highlight Color"),
        new HighlightedStateViewModel.SwitchState(style, "onState", "On State"),
        new HighlightedStateViewModel.SwitchState(style, "offState", "Off State"),
        new HighlightedStateViewModel.Shadow(style, "outerShadow", "Outer Shadow")
    ]);
}

module.exports = SwitchViewModel;
