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
    ko = require('knockout');

function ThemeViewModel(themeManager, parseObject, messageBox) {
    "use strict";


     // Initially just with default values.
     var themeStyles = new ThemeStyles();
     this.model = themeStyles;
}

module.exports = ThemeViewModel;
