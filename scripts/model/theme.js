var ko = require('knockout'),
    ThemeStyles = require('./themeStyles');

/* Note that any fields added here will also have to be applied to ConfigMapping.js */

function Theme(styles) {
    var self = this;

    // the version of the JSON file format
    this.schemaVersion = require('../jsonSchemaVersion.js'); // needs to be object

    //TODO is this now redundant?
    this.DEFAULT_ID = "__DEFAULT__";
    this.defaultName = "Default";

    // a unique ID assigned when the theme is persisted
    // If there is no unique ID, or it's undefined, then the model is not ready.
    this.id = ko.observable(this.defaultThemeId);
    this.isReady = ko.computed( function() {
        var currentId = self.id();
        return (currentId && (currentId !== self.DEFAULT_ID));
    });

    // the user assigned theme name
    this.name = ko.observable(this.defaultName);

    if (styles === undefined) {
        this.styles = new ThemeStyles();
    }
    else {
        this.styles = styles;
    }

    // To minimise initial refactoring, we just provide an interface to all the contained styles.
    this.buttonStyle = this.styles.buttonStyle;
    this.textFieldStyle = this.styles.textFieldStyle;
    this.viewControllerStyle = this.styles.viewControllerStyle;
    this.labelStyle = this.styles.labelStyle;
    this.switchStyle = this.styles.switchStyle;
    this.navigationBarStyle = this.styles.navigationBarStyle;
    this.tableViewCellStyle = this.styles.tableViewCellStyle;
    this.imageViewStyle = this.styles.imageViewStyle;
    this.barButtonItemStyle = this.styles.barButtonItemStyle;
    this.backButtonItemStyle = this.styles.backButtonItemStyle;
    this.sliderStyle = this.styles.sliderStyle;
    this.tabBarStyle = this.styles.tabBarStyle;
}

module.exports = Theme;
