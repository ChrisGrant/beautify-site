var ko = require('knockout'),
    HighlightedStateViewModel = require('./highlightedStateViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function TabBarViewModel(style) {
    var self = this;
    this.model = style;
    ControlEditorViewModel.call(this, "TabBar", [
        new HighlightedStateViewModel.Image(style, self),
        new HighlightedStateViewModel.Color(style,"imageTintColor", "Image Tint Color" ),
        new HighlightedStateViewModel.Gradient(style),
        new HighlightedStateViewModel.Color(style, "backgroundColor", "Background Color"),
        new HighlightedStateViewModel.Shadow(style,"outerShadow", "Outer Shadow"),
        new HighlightedStateViewModel.Shadow(style, "innerShadow", "Inner Shadow")

    ]);
}

module.exports = TabBarViewModel;
