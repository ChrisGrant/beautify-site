var ko = require('knockout'),
    HighlightedStateViewModel = require('./highlightedStateViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function BarButtonViewModel(style) {
    var self = this;
    this.model = style;
    this.previewTitle = "Item";
    this.previewCustomStyleSelector = "bar-button";
    ControlEditorViewModel.call(this, "Bar Button", [
        new HighlightedStateViewModel.Title(style),
        new HighlightedStateViewModel.TitleShadow(style),
        new HighlightedStateViewModel.Border(style),
        new HighlightedStateViewModel.Shadow(style,"innerShadow", "Inner Shadow"),
        new HighlightedStateViewModel.Image(style, self),
        new HighlightedStateViewModel.Gradient(style),
        new HighlightedStateViewModel.Color(style, "backgroundColor", "Background Color"),
        new HighlightedStateViewModel.Shadow(style,"outerShadow", "Outer Shadow")
    ]);
}

module.exports = BarButtonViewModel;
