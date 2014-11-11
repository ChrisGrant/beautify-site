var ko = require('knockout');
ThemeViewModel = require('./themeViewModel');

var DownloadPageViewModel = function() {

    this.themeViewModel = ko.observable(new ThemeViewModel());

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

    };

    this.clickedDownload = function() {

    };
    this.clickedReset = function() {

    };
};

module.exports = DownloadPageViewModel;
