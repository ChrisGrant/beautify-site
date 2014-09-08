var ko = require('knockout');
ThemeViewModel = require('./themeViewModel');

var DownloadPageViewModel = function() {

    this.themeModel = ko.observable(ThemeViewModel());

};

module.exports = DownloadPageViewModel;
