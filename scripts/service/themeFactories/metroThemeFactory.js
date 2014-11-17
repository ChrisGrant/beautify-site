var ThemeStyles = require('../../model/themeStyles'),
	PaletteColorViewModel = require('../../viewModel/paletteColorViewModel')
	TinyColor = require('tinycolor2'),
	Please = require('../please.js'),
	metroTheme = require('../../model/metroTheme'),
  configMapping = require('../../viewModel/configMapping');

function MetroThemeFactory() {
	var self = this;

	this.themeFromColors = function(colors) {
		var style = new ThemeStyles();

		configMapping.mapJStoThemeStyles(metroTheme.theme, style);

		return style;
	};

	this._defaultColors = new Array(new PaletteColorViewModel("#000000"), new PaletteColorViewModel("#FFFFFF"));

	this.defaultColors = function () {
		return self._defaultColors;
	};

	this.surpriseColors = function() {
		var scheme = Please.make_scheme(Please.make_color({format: 'hsv'}));
		var colors = new Array();
		for (var i = 0; i < 2; i++) {
			colors.push(new PaletteColorViewModel(scheme[i], self));
		}
		return colors;
	};

}

module.exports = MetroThemeFactory;
