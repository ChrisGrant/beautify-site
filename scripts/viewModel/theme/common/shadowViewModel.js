var ko = require('knockout'),
    ColorViewModel = require('./colorViewModel'),
    OffsetViewModel = require('./offsetViewModel'),
    NumberChanger = require('./numberChanger'),
    Shadow = require('../../../model/common/shadow');


function ShadowViewModel(shadow, title) {
	
    this.template = "shadowView";
    this.previewTemplate = "shadowPreview";
    this.propertyTitle = title || "Shadow";

    // straight-through properties
    this.enabled = shadow._enabled;

    // adapted properties
    this.color = new ColorViewModel(shadow.color);
    this.offset = new OffsetViewModel(shadow.offset);
    this.angle = this.offset.angle;
    this.distance = this.offset.distance;

    // Differs from textShadow 
    this.radius = shadow.radius;
    this.radiusChanger = new NumberChanger(this.radius, 25, 0, [], new NumberChanger.Suffix("pt"));
}

module.exports = ShadowViewModel;
