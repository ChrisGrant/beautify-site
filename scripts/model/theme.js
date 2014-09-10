var ko = require('knockout'),
    ThemeStyles = require('./themeStyles');

/* Note that any fields added here will also have to be applied to ConfigMapping.js */

function Theme() {
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

    this.styles = new ThemeStyles();
    
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

    /**
     * TODO: Existing functionality... this clashes with the iOS7Theme class functionality.
     */
    function initialise () {
        // create an iOS7 theme by default
        var iOSblue = "#007AFF",
            iOSFont = "HelveticaNeue-Light";
    
        self.buttonStyle.title.color(iOSblue);
        self.buttonStyle.title.font.family(iOSFont);
    
        self.barButtonItemStyle.title.color(iOSblue);
        self.barButtonItemStyle.title.font.family(iOSFont);
    
        self.labelStyle.title.color(iOSblue);
        self.labelStyle.title.font.family(iOSFont);
    
        self.switchStyle.onState.backgroundColor("#4BD863");
        self.switchStyle.offState.backgroundColor("#FFFFFF");
        self.switchStyle.thumbBackgroundColor.color("#FFFFFF");
        self.switchStyle.thumbBorder.cornerRadius(15);
        self.switchStyle.border.color("#E1E1E1");
        self.switchStyle.border.width(2);
        self.switchStyle.border.cornerRadius(25);
    
        self.viewControllerStyle.backgroundColor.color("#FFFFFF");
    
        self.textFieldStyle.title.color("#000000");
        self.textFieldStyle.backgroundColor.color("#FFFFFF");
        self.textFieldStyle.border.color("#E1E1E1");
        self.textFieldStyle.border.width(1);
        self.textFieldStyle.border.cornerRadius(5);
    
        self.navigationBarStyle.backgroundColor.color("#FFFFFF");
        self.navigationBarStyle.title.color("#000000");
    
        self.sliderStyle.maximumTrackColor.color("#0000FF");
        self.sliderStyle.minimumTrackColor.color("#BBBBBB");
    }   
    initialise();
}

module.exports = Theme;
