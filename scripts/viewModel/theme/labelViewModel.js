var ko = require('knockout'),
    HighlightedStateViewModel = require('./highlightedStateViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function LabelViewModel(style) {
    this.model = style;
    ControlEditorViewModel.call(this, "Label", [
        new HighlightedStateViewModel.Title(style),
        new HighlightedStateViewModel.TitleShadow(style)
    ]);
}

module.exports = LabelViewModel;
