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

		var backgroundColor = colors[0];
		var foregroundColor = colors[1];
		var highlightColor = colors[2];
		var highlightColor2 = colors[3];

		// button
		style.buttonStyle.title.color(highlightColor.colorHex());
		var buttonHighlightedColor = new TinyColor(highlightColor.colorHex());
		buttonHighlightedColor.setAlpha(.5);
		style.buttonStyle.stateSetters()[0].value.color(buttonHighlightedColor.toHex8String())

		// text field
		style.textFieldStyle.title.color(foregroundColor.colorHex());
		var textFieldBorderColor = new TinyColor(foregroundColor.colorHex());
		textFieldBorderColor.brighten(80);  // GO - should this be 40?
		style.textFieldStyle.border.color(textFieldBorderColor.toHexString());

		// view controller
		style.viewControllerStyle.backgroundColor.color(backgroundColor.colorHex());

		// label
		style.labelStyle.title.color(foregroundColor.colorHex());

		// switch
		style.switchStyle.onState.textStyle.color(backgroundColor.colorHex());
		style.switchStyle.onState.backgroundColor(highlightColor2.colorHex());
		style.switchStyle.onState.borderColor(highlightColor2.colorHex());
		style.switchStyle.offState.textStyle.color(foregroundColor.colorHex());
		style.switchStyle.offState.backgroundColor(backgroundColor.colorHex());
		var switchOffBorderColor = new TinyColor(backgroundColor.colorHex());
		switchOffBorderColor.darken(10); // GO - should this be 5?
		style.switchStyle.offState.backgroundColor(switchOffBorderColor.toHexString());
		style.switchStyle.thumbBackgroundColor.color(backgroundColor.colorHex());

		// navigation bar
		var navBarColor = new TinyColor(backgroundColor.colorHex());
		navBarColor.darken(10); // GO - should this be 2.5?
		var navBarLineColor = new TinyColor(backgroundColor.colorHex());
		navBarLineColor.darken(40); // GO - should this be 17.5?
		style.navigationBarStyle.backgroundColor.color(navBarColor.toHexString());
		style.navigationBarStyle.backgroundGradient.stops()[0].color(navBarColor.toHexString());
		style.navigationBarStyle.backgroundGradient.stops()[1].color(navBarColor.toHexString());
		style.navigationBarStyle.backgroundGradient.stops()[2].color(navBarLineColor.toHexString());

		// table view cell
		style.tableViewCellStyle.title.color(foregroundColor.colorHex());
		style.tableViewCellStyle.backgroundColor.color(backgroundColor.colorHex());
		var tableViewCellLineColor = new TinyColor(foregroundColor.colorHex());
		tableViewCellLineColor.brighten(40);  // GO - should this be 10?
		style.tableViewCellStyle.backgroundGradient.stops()[2].color(tableViewCellLineColor.toHexString());

		// bar button item
		style.barButtonItemStyle.title.color(highlightColor.colorHex());
		style.barButtonItemStyle.stateSetters()[0].value.color(buttonHighlightedColor.toHex8String());

		// back button
		style.backButtonItemStyle.title.color(highlightColor.colorHex());
		style.backButtonItemStyle.stateSetters()[0].value.color(buttonHighlightedColor.toHex8String());

		// slider
		style.sliderStyle.thumbBackgroundColor.color(backgroundColor.colorHex());
		style.sliderStyle.minimumTrackColor.color(highlightColor.colorHex());
		var sliderTrackColor = new TinyColor(foregroundColor.colorHex());
		sliderTrackColor.brighten(70); // GO - should this be 35
		style.sliderStyle.maximumTrackColor.color(sliderTrackColor.toHexString());
		var sliderThumbBorderColor = new TinyColor(foregroundColor.colorHex());
		sliderThumbBorderColor.setAlpha(0.25);
		style.sliderStyle.thumbBorder.color(sliderThumbBorderColor.toHex8String());

		// tab bar

		return style;
	};

	this.defaultColors = function (downloadPageViewModel) {
		return new Array(
			new PaletteColorViewModel("#FFFFFF", downloadPageViewModel),
			new PaletteColorViewModel("#000000", downloadPageViewModel),
			new PaletteColorViewModel("#007AFF", downloadPageViewModel),
			new PaletteColorViewModel("#4BD562", downloadPageViewModel));
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
