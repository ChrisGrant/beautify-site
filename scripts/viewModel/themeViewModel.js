var ThemeStyles = require('../model/themeStyles'),
    configMapping = require('./configMapping'),
    ErrorReportingService = require('../service/errorReportingService'),
    browserDetect = require('../util/browserDetect'),
    Theme = require('../model/theme'),
    ko = require('knockout');

function ThemeViewModel() {
    "use strict";
    var self = this;
    var data = null;

    this.model = ko.observable(new ThemeStyles());

    this.setTheme = function(theme) {
      self.model(theme);
    };

    this.getData = function() {
      return configMapping.toJS(new Theme(self.model()));
    }

    this.reset = function() {
      self.model(new ThemeStyles());
    }
}

module.exports = ThemeViewModel;
