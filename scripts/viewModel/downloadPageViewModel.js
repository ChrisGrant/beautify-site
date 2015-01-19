var ko = require('knockout'),
PaletteColorViewModel = require('./paletteColorViewModel'),
FlatThemeFactory = require('../service/themeFactories/flatThemeFactory'),
iOS8ThemeFactory = require('../service/themeFactories/iOS8ThemeFactory'),
iOS6ThemeFactory = require('../service/themeFactories/iOS6ThemeFactory'),
MetroThemeFactory = require('../service/themeFactories/metroThemeFactory'),
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
    self.paletteColors(self.activeFactory.defaultColors(self));
  }

  this.paletteColorChanged = function() {
    self.reloadTheme();
  };

  this.clickedFlatStyle = function() {
    self.activeFactory = new FlatThemeFactory();
    self.resetToActiveStyleDefaultColorPalette();
    self.reloadTheme();

    ga('send', 'event', 'button', 'click', 'download-page-style-flat-button');
  };
  this.clickedMaterialStyle = function() {

    ga('send', 'event', 'button', 'click', 'download-page-style-material-button');
  };
  this.clickedGlossStyle = function() {

    ga('send', 'event', 'button', 'click', 'download-page-style-gloss-button');
  };
  this.clickediOS8Style = function() {
    self.activeFactory = new iOS8ThemeFactory();
    self.resetToActiveStyleDefaultColorPalette();
    self.reloadTheme();

    ga('send', 'event', 'button', 'click', 'download-page-style-iOS8-button');
  };
  this.clickediOS6Style = function() {
    self.activeFactory = new iOS6ThemeFactory();
    self.resetToActiveStyleDefaultColorPalette();
    self.reloadTheme();

    ga('send', 'event', 'button', 'click', 'download-page-style-iOS6-button');
  };
  this.clickedMetroStyle = function() {
    self.activeFactory = new MetroThemeFactory();
    self.resetToActiveStyleDefaultColorPalette();
    self.reloadTheme();

    ga('send', 'event', 'button', 'click', 'download-page-style-metro-button');
  };

  this.clickedSurpriseMe = function() {
    self.paletteColors(self.activeFactory.surpriseColors(self));
    self.reloadTheme();

    ga('send', 'event', 'button', 'click', 'download-page-surprise-me-button');
  };

  this.clickedDownload = function() {
    var content = JSON.stringify(self.themeViewModel().getData());
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    downloadLink.setAttribute('download', 'theme.json');
    downloadLink.click();

    ga('send', 'event', 'button', 'click', 'download-page-download-button');
  };

  // Resets the theme to the default state.
  this.clickedReset = function() {
    this.themeViewModel().reset();

    ga('send', 'event', 'button', 'click', 'download-page-reset-button');
  };

};

module.exports = DownloadPageViewModel;
