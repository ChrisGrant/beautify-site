var ko = require('knockout'),
    TextViewModel = require('./common/textViewModel'),
    TextShadowViewModel = require('./common/textShadowViewModel'),
    BackgroundImageEditorViewModel = require('./common/backgroundImageEditorViewModel'),
    GradientEditorViewModel = require('./common/gradientEditorViewModel'),
    EditColorViewModel = require('./common/editColorViewModel'),
    DropShadowViewModel = require('./common/dropShadowViewModel'),
    ControlEditorViewModel = require('./controlEditorViewModel');

function NavigationBarViewModel(style) {
    var self = this;
    this.model = style;
    ControlEditorViewModel.call(this, "Navigation Bar", [                                                                                                             
        new TextViewModel(style.title),
        new TextShadowViewModel(style.titleShadow),
        new BackgroundImageEditorViewModel(style.backgroundImage),
        new GradientEditorViewModel(style.backgroundGradient),
        new EditColorViewModel(style.backgroundColor, "Background Color"),
        new DropShadowViewModel(style.dropShadow),
        new EditColorViewModel(style.tintColor, "Tint Color")
    ]);
}

module.exports = NavigationBarViewModel;
