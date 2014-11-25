var ThemeStyles = require('../../model/themeStyles'),
	PaletteColorViewModel = require('../../viewModel/paletteColorViewModel')
	TinyColor = require('tinycolor2'),
	Please = require('../please.js'),
	iOS6Theme = require('../../model/iOS6Theme'),
  configMapping = require('../../viewModel/configMapping');

function iOS6ThemeFactory() {
	var self = this;

	this.themeFromColors = function(colors) {
		var style = new ThemeStyles();

		configMapping.mapJStoThemeStyles(iOS6Theme.theme, style);

		return style;
	};

	this.defaultColors = function (downloadPageViewModel) {
		return new Array(
			new PaletteColorViewModel("#EEEEEE", downloadPageViewModel), 
			new PaletteColorViewModel("#007AFF", downloadPageViewModel),
			new PaletteColorViewModel("#C1C1C1", downloadPageViewModel));
	};

	this.surpriseColors = function(downloadPageViewModel) {
		var scheme = Please.make_scheme(Please.make_color({format: 'hsv'}));
		var colors = new Array();
		for (var i = 0; i < 3; i++) {
			colors.push(new PaletteColorViewModel(scheme[i], downloadPageViewModel));
		}
		return colors;
	};

}

module.exports = iOS6ThemeFactory;
