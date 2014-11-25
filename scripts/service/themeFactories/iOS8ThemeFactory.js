var ThemeStyles = require('../../model/themeStyles'),
	PaletteColorViewModel = require('../../viewModel/paletteColorViewModel'),
	TinyColor = require('tinycolor2'),
	Please = require('../please.js'),
	iOS8Theme = require('../../model/iOS8Theme'),
	configMapping = require('../../viewModel/configMapping');

function iOS8ThemeFactory() {
	var self = this;

	this.themeFromColors = function(colors) {
		var style = new ThemeStyles();

		configMapping.mapJStoThemeStyles(iOS8Theme.theme, style);

		var backgroundColor = colors[0].colorHex();
		var textColor = colors[1].colorHex();
		var highlightColor = colors[2].colorHex();
		var highlightColor2 = colors[3].colorHex();

		// // Lighten text color for grey inline for each field (as appropriate).

		style.buttonStyle.title.color(colors[1].colorHex());

		style.textFieldStyle.border.color(colors[2].colorHex());

		style.viewControllerStyle.backgroundColor.color(colors[0].colorHex());

		style.labelStyle.title.color(colors[1].colorHex());

		// Lighten the text color for the nav bar color.
		var navBarColor = new TinyColor(colors[1].colorHex());
		navBarColor.lighten(90);
		style.navigationBarStyle.backgroundColor.color(navBarColor.toHexString()); 

		style.tableViewCellStyle.title.color(colors[1].colorHex());

		style.barButtonItemStyle.title.color(colors[1].colorHex());

		style.backButtonItemStyle.title.color(colors[1].colorHex());

		style.sliderStyle.thumbBackgroundColor.color(colors[0].colorHex());
		style.sliderStyle.minimumTrackColor.color(colors[2].colorHex());
		style.sliderStyle.maximumTrackColor.color("#B2B2B2");

		return style;
	};

	this.defaultColors = function (downloadPageViewModel) {
		return new Array(
			new PaletteColorViewModel("#FFFFFF", downloadPageViewModel),
			new PaletteColorViewModel("#000000", downloadPageViewModel),
			new PaletteColorViewModel("#007AFF", downloadPageViewModel),
			new PaletteColorViewModel("#4BD863", downloadPageViewModel));
	};

	this.surpriseColors = function(downloadPageViewModel) {
		var scheme = Please.make_scheme(Please.make_color({format: 'hsv'}));
		var colors = new Array();
		for (var i = 0; i < 4; i++) {
			colors.push(new PaletteColorViewModel(scheme[i], downloadPageViewModel));
		}
		return colors;
	};

}

module.exports = iOS8ThemeFactory;
