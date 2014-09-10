var ko = require('knockout'),
    BorderViewModel = require('./common/borderViewModel'),
    ShadowViewModel = require('./common/shadowViewModel'),
    BackgroundColorViewModel = require('./common/editColorViewModel'),
    GradientEditorViewModel = require('./common/gradientEditorViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function ImageViewModel(style) {
    this.model = style;
    ControlEditorViewModel.call(this, "Image View", [
        new BorderViewModel(style.border, "Border"),
        new ShadowViewModel(style.innerShadow, "Inner Shadow"),
        new ShadowViewModel(style.outerShadow, "Outer Shadow")
    ]);
}

module.exports = ImageViewModel;
