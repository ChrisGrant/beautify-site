var ko = require("knockout"),
    Stop = require("../../../model/common/stop"),
    StopViewModel = require("./stopViewModel");

function GradientEditorViewModel(gradient, propertyTitle) {

    this.template = "gradientEditor";
    this.propertyTitle = propertyTitle || "Background Gradient";

    this.model = gradient;

    this.radial = gradient.radial;
    this.enabled = gradient._enabled;

    function asStopViewModels(stops) {
        return gradient.stops().map(function(stop) {
            return new StopViewModel(stop);
        });
    }

    this.stops = ko.observableArray(gradient.stops().map(function(stop) {
        return new StopViewModel(stop);
    }));
    gradient.stops.subscribe(function (stops) {
        this.stops.removeAll();
        stops.forEach(function (stop) {
            this.stops.push(new StopViewModel(stop));
        }, this);
    }, this);

    this.hasEnabledProperty = true;

    this.addStop = function(position) {
        var stop = new Stop({ position: ko.observable(position) });
        gradient.stops.push(stop);
    };
    this.removeStop = function(stop) {
        gradient.stops.remove(stop.model);
    };
}

module.exports = GradientEditorViewModel;
