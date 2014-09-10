var ko = require('knockout'),  
    ColorViewModel = require('./colorViewModel'),
	OffsetViewModel = require('./offsetViewModel');

function TextShadowViewModel(textShadow, title) {
    var that = this;

    this.template = "titleShadowView";
    this.previewTemplate = "titleShadowPreview";
    this.propertyTitle = title || "Text Shadow";

    // straight-through properties
    this.enabled = textShadow._enabled;

    // adapted properties
    this.color = new ColorViewModel(textShadow.color);
    this.offset = new OffsetViewModel(textShadow.offset);    
    this.angle = this.offset.angle;
    this.distance = this.offset.distance;
}

module.exports = TextShadowViewModel;
