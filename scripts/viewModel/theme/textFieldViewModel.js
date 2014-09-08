var ko = require('knockout'),
    HighlightedStateViewModel = require('./highlightedStateViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function TextFieldViewModel(style) {
    var self = this;
    this.model = style;
    ControlEditorViewModel.call(this, "Text Field", [
        new HighlightedStateViewModel.Title(style),
        new HighlightedStateViewModel.Border(style),
        new HighlightedStateViewModel.Shadow(style, "innerShadow", "Inner Shadow"),
        new HighlightedStateViewModel.Image(style, self),
        new HighlightedStateViewModel.Gradient(style),
        new HighlightedStateViewModel.Color(style, "backgroundColor", "Background Color"),
        new HighlightedStateViewModel.Shadow(style, "outerShadow", "Outer Shadow")
    ]);
}

module.exports = TextFieldViewModel;
