var ko = require('knockout'),
    ColorViewModel = require('./colorViewModel'),
    NumberChanger = require('./numberChanger');

// border view model adapts a border model

function BorderViewModel(border, propertyTitle) {

    this.template = "borderView";
    this.previewTemplate = "borderPreview";
    this.propertyTitle = propertyTitle || "Border";

    // adapted properties
    this.color = new ColorViewModel(border.color);

    // straight-through properties
    this.width = border.width;
    this.cornerRadius = border.cornerRadius;
    this.enabled = border._enabled;

    //adapter properties
    this.widthChanger = new NumberChanger(border.width, 25, 0, [], new NumberChanger.Suffix("pt"));
    this.radiusChanger = new NumberChanger(border.cornerRadius, 25, 0, [], new NumberChanger.Suffix("pt"));
}

module.exports = BorderViewModel;
