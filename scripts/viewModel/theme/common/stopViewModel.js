var ColorViewModel = require('./colorViewModel');

function StopViewModel(stop) {

    // expose the underlying model object that this view model adapts
    this.model = stop;

    // adapted properties
    this.color = new ColorViewModel(stop.color);

    // straight-through properties
    this.position = stop.position;
}

module.exports = StopViewModel;
