var ThemeStyles = require('../model/themeStyles'),
	Text = require('../model/common/text'),
	Color = require('../model/common/color');

function FlatThemeFactory() {
		var self = this;

		this.themeFromColors = function(colors) {
			var style = new ThemeStyles();

			style.navigationBarStyle.backgroundColor.color(colors[0].colorHex());

			style.buttonStyle.backgroundColor.color(colors[1].colorHex());
			
			style.labelStyle.title.font.size(16);

			style.textFieldStyle.border.width(1);
			style.textFieldStyle.border.color(colors[1].colorHex());
			style.textFieldStyle.border.cornerRadius(0);
			style.textFieldStyle.border._enabled(true);

			style.textFieldStyle.title.color("#000000");
			style.textFieldStyle.title.font.style("Light"); // TODO doesn't work for some reason.
			style.textFieldStyle.title.font.size(14);

			return style;
		};
}

module.exports = FlatThemeFactory;
