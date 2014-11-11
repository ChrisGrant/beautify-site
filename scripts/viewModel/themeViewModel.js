var ThemeStyles = require('../model/themeStyles'),
    configMapping = require('./configMapping'),
    ErrorReportingService = require('../service/errorReportingService'),
    browserDetect = require('../util/browserDetect'),
    iOS7Theme = require('../model/iOS7Theme'),
    sentriTheme = require('../model/sentriTheme'),
    ko = require('knockout');

function ThemeViewModel() {
    "use strict";
    var self = this;
    var data = null;

    /**
     * Set data using json object, and apply it to the model.
     */
    this.setData = function(jsonData) {
        data = jsonData;
        console.log("Parsing JSON data for the theme with ID", jsonData.id);
        configMapping.mapJStoThemeStyles(data.theme, self.model);
    };

    // Initially just with default values.
    var themeStyles = new ThemeStyles();
    this.model = themeStyles;

    this.setData(sentriTheme);
}

module.exports = ThemeViewModel;
