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

      // Set some defaults on the styles.
      var iOSBlue = "#007AFF", iOSFont = "HelveticaNeue-Light";

      this.buttonStyle.title.color(iOSBlue);
      this.buttonStyle.title.font.family(iOSFont);

      this.barButtonItemStyle.title.color(iOSBlue);
      this.barButtonItemStyle.title.font.family(iOSFont);
      this.backButtonItemStyle.title.color(iOSBlue);
      this.backButtonItemStyle.title.font.family(iOSFont);

      this.labelStyle.title.color("#000000");
      this.labelStyle.title.font.family(iOSFont);

      this.switchStyle.onState.backgroundColor("#4BD863");
      this.switchStyle.offState.backgroundColor("#FFFFFF");
      this.switchStyle.thumbBackgroundColor.color("#FFFFFF");
      this.switchStyle.thumbBorder.cornerRadius(15);
      this.switchStyle.border.color("#E1E1E1");
      this.switchStyle.border.width(2);
      this.switchStyle.border.cornerRadius(25);

      this.switchStyle.onState.text("ON");
      this.switchStyle.onState.textStyle.color("#000000");
      this.switchStyle.onState.textStyle.font.family(iOSFont);

      this.switchStyle.offState.text("OFF");
      this.switchStyle.offState.textStyle.color("#000000");
      this.switchStyle.offState.textStyle.font.family(iOSFont);

      this.viewControllerStyle.backgroundColor.color("#FFFFFF");

      this.textFieldStyle.title.color("#000000");
      this.textFieldStyle.title.font.family(iOSFont);
      this.textFieldStyle.backgroundColor.color("#FFFFFF");
      this.textFieldStyle.border.color("#E1E1E1");
      this.textFieldStyle.border.width(1);
      this.textFieldStyle.border.cornerRadius(0);
      this.textFieldStyle.border._enabled(true);

      this.tableViewCellStyle.title.color("#000000"); 
      this.tableViewCellStyle.title.font.family(iOSFont);

      this.navigationBarStyle.backgroundColor.color("#E1E1E1");
      this.navigationBarStyle.title.color("#000000");

      this.sliderStyle.minimumTrackColor.color(iOSBlue);
      this.sliderStyle.maximumTrackColor.color("#E1E1E1");

      this.toJson = function() {
        return ConfigMapping.mapThemeStylesToJS(self);
      };
    }

    module.exports = ThemeStyles;
