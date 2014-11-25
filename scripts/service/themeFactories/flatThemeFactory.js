var ThemeStyles = require('../../model/themeStyles'),
	PaletteColorViewModel = require('../../viewModel/paletteColorViewModel')
	TinyColor = require('tinycolor2'),
	Please = require('../please.js')
	flatTheme = require('../../model/flatTheme'),
	configMapping = require('../../viewModel/configMapping');

function FlatThemeFactory() {
	var self = this;

	this.themeFromColors = function(colors) {
		var style = new ThemeStyles();

		configMapping.mapJStoThemeStyles(flatTheme.theme, style);

		style.navigationBarStyle.backgroundColor.color(colors[0].colorHex());

		style.buttonStyle.backgroundColor.color(colors[1].colorHex());

		style.labelStyle.title.font.size(16);

		style.textFieldStyle.border.width(1);
		style.textFieldStyle.border.color(colors[1].colorHex());
		style.textFieldStyle.border.cornerRadius(0);
		style.textFieldStyle.border._enabled(true);

		style.textFieldStyle.title.color("#000000");
		style.textFieldStyle.title.font.size(14);

		return style;
	};

	this.defaultColors = function (downloadPageViewModel) {
		return new Array(
			new PaletteColorViewModel("#000000", downloadPageViewModel),
			new PaletteColorViewModel("#ffffff", downloadPageViewModel));
	};

	this.surpriseColors = function(downloadPageViewModel) {
		var scheme = Please.make_scheme(Please.make_color({format: 'hsv'}));
		var colors = new Array();
		for (var i = 0; i < 2; i++) {
			colors.push(new PaletteColorViewModel(scheme[i], downloadPageViewModel));
		}
		return colors;
	};

}

module.exports = FlatThemeFactory;
