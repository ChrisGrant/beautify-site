var ko = require('knockout'),
sentriTheme = require('../model/sentriTheme'),
Please = require('../service/please.js'),
PaletteColorViewModel = require('./paletteColorViewModel'),
ThemeViewModel = require('./themeViewModel');

var DownloadPageViewModel = function() {
  var self = this;

    this.regenerateColors = function() {
      self.paletteColors.removeAll();
      
      var scheme = Please.make_scheme(Please.make_color({format: 'hsv'}));

      for (var i = 0; i < scheme.length; i++) {
        self.paletteColors.push(new PaletteColorViewModel(scheme[i]));
      }
    }

    this.themeViewModel = ko.observable(new ThemeViewModel());

    this.themeViewModel().setData(sentriTheme);

    this.themeColor = ko.observable(Please.make_color());

    this.paletteColors = ko.observableArray();

    this.regenerateColors();

    this.clickedFlatStyle = function() {

    };
    this.clickedMaterialStyle = function() {

    };
    this.clickedGlossStyle = function() {

    };
    this.clickediOS8Style = function() {

    };
    this.clickediOS6Style = function() {

    };
    this.clickedDroidStyle = function() {

    };

    this.clickedYellowColorPalette = function() {

    };
    this.clickedRedColorPalette = function() {

    };
    this.clickedGreenColorPalette = function() {

    };
    this.clickedSurpriseMe = function() {
      self.regenerateColors();
    };

    this.clickedDownload = function() {

    };
    this.clickedReset = function() {

    };
};

module.exports = DownloadPageViewModel;
