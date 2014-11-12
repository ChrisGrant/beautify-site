var ko = require('knockout');

function PaletteColorViewModel(color, parent) {
	var self = this;
	this.parent = parent;

	this._colorHex = ko.observable(color);

	this.colorHex = ko.computed({
		read: function () {
			return self._colorHex();
		},
		write: function (value) {
			self._colorHex(value);
			self.parent.paletteColorChanged();
		},
		owner: this
	});
}

module.exports = PaletteColorViewModel;
