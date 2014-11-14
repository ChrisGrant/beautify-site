var ko = require('knockout'),
Please = require('../service/please.js'),
PaletteColorViewModel = require('./paletteColorViewModel'),
FlatThemeFactory = require('../service/themeFactories/flatThemeFactory'),
iOS8ThemeFactory = require('../service/themeFactories/iOS8ThemeFactory'),
ThemeViewModel = require('./themeViewModel');

var DownloadPageViewModel = function() {
  var self = this;

  this.activeFactory = new FlatThemeFactory();

  this.regenerateColors = function() {
    self.paletteColors.removeAll();

    var scheme = Please.make_scheme(Please.make_color({format: 'hsv'}));

    for (var i = 0; i < 4; i++) {
      self.paletteColors.push(new PaletteColorViewModel(scheme[i], self));
    }
  }

  this.reloadTheme = function() {
    self.themeViewModel().setTheme(self.activeFactory.themeFromColors(self.paletteColors()));
  };

  this.themeColor = ko.observable(Please.make_color());

  this.paletteColors = ko.observableArray();

  this.regenerateColors();

  this.themeViewModel = ko.observable(new ThemeViewModel());

  this.resetToActiveStyleDefaultColorPalette = function() {
    self.paletteColors(self.activeFactory.defaultColors());
  }

  this.paletteColorChanged = function() {
    self.reloadTheme();
  };

  this.clickedFlatStyle = function() {
    self.activeFactory = new FlatThemeFactory();
    self.resetToActiveStyleDefaultColorPalette();
    self.reloadTheme();
  };
  this.clickedMaterialStyle = function() {

  };
  this.clickedGlossStyle = function() {

  };
  this.clickediOS8Style = function() {
    self.activeFactory = new iOS8ThemeFactory();
    self.resetToActiveStyleDefaultColorPalette();
    self.reloadTheme();
  };
  this.clickediOS6Style = function() {

  };
  this.clickedDroidStyle = function() {

  };

  this.clickedSurpriseMe = function() {
    self.regenerateColors();
    self.reloadTheme();
  };

  this.clickedDownload = function() {
    var content = JSON.stringify(self.themeViewModel().getData());
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    downloadLink.setAttribute('download', 'theme.json');
    downloadLink.click();
  };

  // Resets the theme to the default state.
  this.clickedReset = function() {
    this.themeViewModel().reset();
  };

};

module.exports = DownloadPageViewModel;
