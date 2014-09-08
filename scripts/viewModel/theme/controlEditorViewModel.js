var ko = require('knockout'),
    $ = require("jquery-browserify");

// a view model that provides an editor for a specific control, e.g. a button or label

function ControlEditorViewModel(title, propertyModels) {
    this.title = title;
    this.selectedControl = ko.observable(false);
    this.propertyModels = propertyModels;

    this.toggleEnabledState = function (vm, event) {
        if (vm.hasOwnProperty("enabled")) {
            vm.enabled(!vm.enabled());
        }
    };
}

module.exports = ControlEditorViewModel;
