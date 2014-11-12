var ko = require('knockout');

function PaletteColorViewModel(color) {
		var self = this;

		this.colorHex = ko.observable(color);
}

module.exports = PaletteColorViewModel;
