var ko = require('knockout'),
    Text = require('./text');

function SwitchState(switchState) {
    this.textStyle = new Text(switchState ? switchState.textStyle : undefined);
    this.text = ko.observable(switchState ? switchState.text() : "");
    this.backgroundColor = ko.observable(switchState ? switchState.backgroundColor() : "#ffffff");
    this.borderColor = ko.observable(switchState ? switchState.borderColor() : "#bbbbbb");
}

module.exports = SwitchState;
