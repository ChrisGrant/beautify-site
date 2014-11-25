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

		// Lighten text color for grey inline for each field (as appropriate).

		style.buttonStyle.backgroundColor.color("#00000000");
		style.buttonStyle.title.font.family("HelveticaNeue-Light");
		style.buttonStyle.title.color(colors[1].colorHex());

		style.textFieldStyle.border.width(1);
		style.textFieldStyle.border.color(colors[2].colorHex());
		style.textFieldStyle.border.cornerRadius(5);
		style.textFieldStyle.border._enabled(true);
		style.textFieldStyle.title.color("#000000");
		style.textFieldStyle.title.font.size(14);
		style.textFieldStyle.title.font.family("HelveticaNeue-Light");

		style.viewControllerStyle.backgroundColor.color("#FFFFFF");

		style.labelStyle.title.font.family("HelveticaNeue");
		style.labelStyle.title.color(colors[1].colorHex());

		style.switchStyle.onState.textStyle.color("#FFFFFF");
		style.switchStyle.onState.textStyle.font.family("Helvetica-Light");
		style.switchStyle.onState.backgroundColor("#4BD863");
		style.switchStyle.onState.borderColor("#4BD863");
		style.switchStyle.offState.textStyle.color("#FFFFFF");
		style.switchStyle.offState.textStyle.font.family("Helvetica-Light");
		style.switchStyle.offState.backgroundColor("#E0E0E0");
		style.switchStyle.offState.borderColor("#E0E0E0");
		style.switchStyle.thumbInset(1.5);
		style.switchStyle.thumbBorder._enabled(true);
		style.switchStyle.thumbBorder.width(0);
		style.switchStyle.thumbBorder.color("#00000000");
		style.switchStyle.highlightColor.color("#00000000");
		style.switchStyle.thumbBackgroundColor.color("#FFFFFF");
		style.switchStyle.thumbOuterShadow._enabled(true);
		style.switchStyle.thumbOuterShadow.color("#999999");
		style.switchStyle.thumbOuterShadow.radius(5);
		style.switchStyle.thumbOuterShadow.offset.x(0);
		style.switchStyle.thumbOuterShadow.offset.y(0);
		style.switchStyle.border._enabled(true);
		style.switchStyle.border.width(2);
		style.switchStyle.border.color("#E0E0E0");
		style.switchStyle.border.cornerRadius(25);

		style.navigationBarStyle.title.font.size(18);
		style.navigationBarStyle.title.font.family("HelveticaNeue-Light");
		// Lighten the text color for the nav bar color.
		var navBarColor = new TinyColor(colors[1].colorHex());
		navBarColor.lighten(90);
		style.navigationBarStyle.backgroundColor.color(navBarColor.toHexString()); 

		style.tableViewCellStyle.title.color("#000000");
		style.tableViewCellStyle.title.font.family("HelveticaNeue-Light");
		style.tableViewCellStyle.backgroundColor.color("#FFFFFF");

		style.barButtonItemStyle.title.color(colors[1].colorHex());
		style.barButtonItemStyle.title.font.family("HelveticaNeue-Light");

		style.backButtonItemStyle.title.color(colors[1].colorHex());
		style.backButtonItemStyle.title.font.family("HelveticaNeue-Light");
		style.backButtonItemStyle.backgroundImage.data("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABbgAAAA8CAYAAACkRdxLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBCNkYzQUYzMjFEMDExRTM5RDQ1RjdERUQ4OUZGNjczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBCNkYzQUY0MjFEMDExRTM5RDQ1RjdERUQ4OUZGNjczIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEI2RjNBRjEyMUQwMTFFMzlENDVGN0RFRDg5RkY2NzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEI2RjNBRjIyMUQwMTFFMzlENDVGN0RFRDg5RkY2NzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6yNBJZAAAExUlEQVR42uzdTagVZRwG8LmjWNwiQdKFGEHRQigQahH0BX0qlKsUTKEPocg2hS6KorRFi6KgIhLKQnJRWJGWGmK2rFW2qJ2rBFtEQZAuJDk9w5FqcWa8H+85l4HfD56F/t95L/yXD8OcqcFgUAEAAAAAQN9MKbgBAAAAAOgjBTcAAAAAAL2k4AYAAAAAoJcU3AAAAAAA9JKCGwAAAACAXlJwAwAAAADQSwpuAAAAAAB66d+C+6oX/57oHz718mLbBwAAAABgzuox3j2dHEy+SC63agAAAAAAShrXa9SXJAeSuy/8+3CyLjlj5QAAAAAAlDCON7iXJPur/8rtxm3VsOSetnIAAAAAAEooXXAvSj5KHhgxuz1518oBAAAAACihZME9lbyfbOw4c9rKAQAAAAAooVTB3ZTbbyePdJzZl7xg5QAAAAAAlFCq4H41eapj/nk1LL/PWzkAAAAAACWUKLhfSnZ0zI8kmyrlNgAAAAAABc234N6e7OyYf5s8mJyzagAAAAAASppPwf1k8lrH/PtkfXLWmgEAAAAAKG2uBffDyTvV8MclRzmRrE3+smIAAAAAAMZhLgX3hmRP1V5u/5zcl/xpvQAAAAAAjMtsC+77k33Jopb5yeTe5DerBQAAAABgnGZTcN+V7E+WtMxPXThz2loBAAAAABi3mRbctyQHk0tb5r8mdya/WCkAAAAAAJMwk4L7puRQMt0ybz5H0nyW5KR1AgAAAAAwKRcruJu3so8kS1vmzQ9Jrk1+skoAAAAAACapq+B+LDmWXNkyP5OsS36wRgAAAAAAJq2t4H40eS+ZapmfTdYn31khAAAAAAALYVTBvaUalttt5fe5ZENy3PoAAAAAAFgoo0rs55JFHc/sSg5bHQAAAAAAC2lUwf1sNXxLu832ZI3VAQAAAACwkEYV3F8mDyXnW55ZlhxNbrA+AAAAAAAWStt3tj9LNlftJffy5Fiy2goBAAAAAFgIdcfsk2Rr1V5yr6iGJfd11ggAAAAAwKTVF5nvTR5PBi3zlcnx5FqrBAAAAABgkuoZnPkg2Va1l9yrkm+Sq60TAAAAAIBJqWd4bnfydMe8KbebN7lXWSkAAAAAAJNQz+LsW8n2jvk11bDkXmmtAAAAAACMWz3L828kz3fMmx+cbH54coXVAgAAAAAwTvUcnnkl2dkxX10Nv8m93HoBAAAAABiXeo7P7aqGRXeb65OjyTIrBgAAAABgHOp5PNt8quT1jvmaalhyL7VmAAAAAABKq+f5/I7kzY75jcnXlZIbAAAAAIDC6gJ3PJPs7pjfnHyVXGbdAAAAAACUUqLgHiTbkj0dZ25NDiXTVg4AAAAAQAl1oXuakvuJZG/HmTsuMgcAAAAAgBmrC951PtmafNxx5gorBwAAAACghLrwfU3JvSX5dMTsRLLJygEAAAAAKKEew51Nyb05OfC///sxuSf5w8oBAAAAAChh8ZjuPZdsTD5MVlTDN7d/t24AAAAAAEpZPMa7m5J7sxUDAAAAADAOtRUAAAAAANBHU4PBwBYAAAAAAOgdBTcAAAAAAL2k4AYAAAAAoJcU3AAAAAAA9JKCGwAAAACAXlJwAwAAAADQSwpuAAAAAAB6ScENAAAAAEAv/SPAAJLKo0xMYKP5AAAAAElFTkSuQmCC");
		style.backButtonItemStyle.backgroundImage.contentMode("aspectFill");
		style.backButtonItemStyle.backgroundImage._enabled(true);

		style.sliderStyle.barHeightFraction(0.1);
		style.sliderStyle.barBorder._enabled(true);
		style.sliderStyle.barBorder.width(0);
		style.sliderStyle.barBorder.cornerRadius(3);
		style.sliderStyle.thumbBorder._enabled(true);
		style.sliderStyle.thumbBorder.width(0);
		style.sliderStyle.thumbBorder.cornerRadius(25);
		style.sliderStyle.thumbBackgroundColor.color("#FFFFFF");
		style.sliderStyle.minimumTrackColor.color("#007AFF");
		style.sliderStyle.maximumTrackColor.color("#B2B2B2");
		style.sliderStyle.thumbOuterShadow._enabled(true);
		style.sliderStyle.thumbOuterShadow.color("#AAAAAA");
		style.sliderStyle.thumbOuterShadow.radius(4);
		style.sliderStyle.thumbOuterShadow.offset.x(0);
		style.sliderStyle.thumbOuterShadow.offset.y(2);

		return style;
	};

	this._defaultColors = new Array(new PaletteColorViewModel("#FFFFFF"), new PaletteColorViewModel("#000000"), new PaletteColorViewModel("#007AFF"), new PaletteColorViewModel("#4BD863"));

	this.defaultColors = function () {
		return self._defaultColors;
	};

	this.surpriseColors = function() {
		var scheme = Please.make_scheme(Please.make_color({format: 'hsv'}));

		var colors = new Array();
		for (var i = 0; i < 4; i++) {
			colors.push(new PaletteColorViewModel(scheme[i], self));
		}

		return colors;
	};

}

module.exports = iOS8ThemeFactory;
