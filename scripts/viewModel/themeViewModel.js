/**
 * ThemeViewModel
 * is responsible for linking the Parse.Object that store the theme identifying data (associated with the user)
 * with the Parse-stored json data that?s mapped to and from the ThemeModel owned by the ApplicationViewModel
 * (the "current theme") to drive the editor and previews.
 * It is associated with a themeManager, which it delegates most of it's methods to.
 *
 * TODO Introducing ThemeStyles as the underlying associated model.
 */

var ThemeStyles = require('../model/themeStyles'),
    configMapping = require('./configMapping'),
    ErrorReportingService = require('../service/errorReportingService'),
    browserDetect = require('../util/browserDetect'),
    iOS7Theme = require('../model/iOS7Theme'),
    ko = require('knockout');

function ThemeViewModel(themeManager, parseObject, messageBox) {
    "use strict";
    var self = this;
    var data = null;

    /**
     * Publish the stored data, loading the file if required.
     */
    this.fetchData = function (publishData) {
        if (data) {
            publishData(data);
        }
        else {
            themeManager.readData(self, function receiveData(newData) {
                self.setData(newData);
                publishData(newData);
            });
        }
    };

    /**
     * Set data using json object, and apply it to the model.
     */
    this.setData = function(jsonData) {
        data = jsonData;
        console.log("Parsing JSON data for the theme with ID", jsonData.id);
        configMapping.mapJStoThemeStyles(data.theme, self.model);
    };

    /**
     * Return the data.  If it has not been previously fetched it will return null.
     * TODO: Deprecated.
     * This is only used in test classes to allow shallow copies of a view model without
     * duplicating a parse id.
     */
    this.getData = function(jsonData) {
        return data;
    };

     // Initially just with default values.
     var themeStyles = new ThemeStyles();
     this.model = themeStyles;

     this.setData(iOS7Theme);

}

module.exports = ThemeViewModel;
