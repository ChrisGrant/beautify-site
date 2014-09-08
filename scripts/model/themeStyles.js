/**
 * Cut down version of the theme model
 */
var ConfigMapping = require('../viewModel/configMapping'), // potentially circular dependency.
    ButtonStyle = require('./buttonStyle'),
	SwitchStyle = require('./switchStyle'),
	TextFieldStyle = require('./textFieldStyle'),
	NavigationBarStyle = require('./navigationBarStyle'),
	ViewControllerStyle = require('./viewControllerStyle'),
	TableViewCellStyle = require('./tableViewCellStyle'),
	LabelStyle = require('./labelStyle'),
	SliderStyle = require('./sliderStyle'),
	ImageViewStyle = require('./imageViewStyle'),
    TabBarStyle = require('./tabBarStyle');

/**
 * Collection of styles used to compose a theme.
 * This will be mapped by configMapping.
 * TODO: Implement a copy constructor.
 * @returns
 */
function ThemeStyles(copy) {	
    var self = this;
    
    // the style properties 
    this.buttonStyle = new ButtonStyle(copy ? copy.buttonStyle : undefined);
    this.textFieldStyle = new TextFieldStyle(copy ? copy.textFieldStyle : undefined);
    this.viewControllerStyle = new ViewControllerStyle(copy ? copy.viewControllerStyle : undefined);
    this.labelStyle = new LabelStyle(copy ? copy.labelStyle : undefined);
    this.switchStyle = new SwitchStyle(copy ? copy.switchStyle : undefined);
    this.navigationBarStyle = new NavigationBarStyle(copy ? copy.navigationBarStyle : undefined);
    this.tableViewCellStyle = new TableViewCellStyle(copy ? copy.tableViewCellStyle : undefined);
    this.imageViewStyle = new ImageViewStyle(copy ? copy.imageViewStyle : undefined);
    this.barButtonItemStyle = new ButtonStyle(copy ? copy.barButtonItemStyle : undefined);
    this.backButtonItemStyle = new ButtonStyle(copy ? copy.backButtonItemStyle : undefined);
    this.sliderStyle = new SliderStyle(copy ? copy.sliderStyle : undefined);
    this.tabBarStyle = new TabBarStyle(copy ? copy.tabBarStyle : undefined);
    
    this.toJson = function() {
        return ConfigMapping.mapThemeStylesToJS(self);
    };
}
    
module.exports = ThemeStyles;
