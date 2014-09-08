var ko = require('knockout');
ThemeViewModel = require('./themeViewModel');

var DownloadPageViewModel = function() {

    this.themeViewModel = ko.observable(new ThemeViewModel());

};

module.exports = DownloadPageViewModel;
