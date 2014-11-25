var ko = require('knockout');

// The downloadPageViewModel must be passed to the PaletteColorViewModel so that it can inform it when it changes.
function PaletteColorViewModel(color, downloadPageViewModel) {
	var self = this;
	this.downloadPageViewModel = downloadPageViewModel;

	this._colorHex = ko.observable(color);

	this.colorHex = ko.computed({
		read: function () {
			return self._colorHex();
		},
		write: function (value) {
			self._colorHex(value);
			self.downloadPageViewModel.paletteColorChanged();
		},
		owner: this
	});
}

module.exports = PaletteColorViewModel;
