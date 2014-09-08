var ko = require('knockout'),
    TextViewModel = require('./textViewModel');
ColorViewModel = require('./colorViewModel');

function SwitchStateViewModel(switchState, propertyTitle) {

    this.template = "switchStateView";
    this.propertyTitle = propertyTitle || "Switch State";

    // straight-through properties
    this.text = switchState.text;

    // adapted properties
    this.backgroundColor = new ColorViewModel(switchState.backgroundColor);
    this.borderColor = new ColorViewModel(switchState.borderColor);
    this.textStyle = new TextViewModel(switchState.textStyle);
}

module.exports = SwitchStateViewModel;
