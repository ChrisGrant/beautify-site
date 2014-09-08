var ko = require('knockout'),
    BackgroundColorViewModel = require('./common/editColorViewModel'),
    GradientEditorViewModel = require('./common/gradientEditorViewModel'),
    BackgroundImageEditorViewModel = require('./common/backgroundImageEditorViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function ViewControllerViewModel(style) {
    this.model = style;
    ControlEditorViewModel.call(this, "View Controller", [
        new BackgroundImageEditorViewModel(style.backgroundImage, this),
        new GradientEditorViewModel(style.backgroundGradient),
        new BackgroundColorViewModel(style.backgroundColor)
    ]);
}

module.exports = ViewControllerViewModel;
