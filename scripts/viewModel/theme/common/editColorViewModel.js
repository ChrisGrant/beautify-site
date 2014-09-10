var ko = require('knockout'),
    ColorViewModel = require('./colorViewModel');

// background color view model adapts a background color model

function EditColorViewModel(color, propertyTitle) {

    this.template = "backgroundColorView";
    this.propertyTitle = propertyTitle || "Color";
    // adapted properties
    this.color = new ColorViewModel(color.color);
}

module.exports = EditColorViewModel;
