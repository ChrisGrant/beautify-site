var ko = require('knockout'),
    ColorViewModel = require('./colorViewModel'),
    NumberChanger = require('./numberChanger');

function DropShadowViewModel(dropShadow, styleToAddTo, title) {

    this.template = "dropShadowView";
    this.propertyTitle = title || "Drop Shadow";
    
    //straight through properties
    this.height = dropShadow.height;
    this.enabled = dropShadow._enabled;

    //adapted properties
    this.heightChanger = new NumberChanger(this.height, 25, 0, [], new NumberChanger.Suffix("pt"));
    this.color = new ColorViewModel(dropShadow.color);
}

module.exports = DropShadowViewModel;
