/* global require */
var ko = require('knockout'),
    gradientToCSS = require("../util/gradientToCSS"),
    contentModeToCSS = require("../util/contentModeToCSS"),
    colorToCSS = require('../util/colorToCSS'),
    $ = require("jquery-browserify"),
    ButtonStyle = require('../model/buttonStyle'),
    SwitchStyle = require('../model/switchStyle'),
    TextFieldStyle = require('../model/textFieldStyle'),
    NavigationBarStyle = require('../model/navigationBarStyle'),
    ViewControllerStyle = require('../model/viewControllerStyle'),
    TableViewCellStyle = require('../model/tableViewCellStyle'),
    LabelStyle = require('../model/labelStyle'),
    SliderStyle = require('../model/sliderStyle'),
    ImageViewStyle = require('../model/imageViewStyle'),
    TabBarStyle = require('../model/tabBarStyle');

/*
This file contains a nubmer of custom knockout bindings that render a preview of a style. To make use of the these bindings
simply bind a div to the correct style model object:

<div data-bind="buttonPreviewBinding:buttonStyle"> </div>

where the above buttonPreviewBinding binding handler is set to an instance constructured via the ButtonPreviewBinding function below.

These binding handler will construct the required DOM structure to support the preview.
*/

// these values are duplicated from the samples.less file.
var SWITCH_PREVIEW_HEIGHT = 31;
var PREVIEW_HEIGHT = 37;
var TIMEOUT_HANDLE = "timeoutHandle";

/**
This function will cause the given updateFunction to be called via a JavaScript timeout-timer in
order to defer its execution. The timeout handle is associated with the given DOM element in order
to manage its state.
 */
function deferredUpdate(element, updateFunction) {
    // obtain this elements timeout handle
    var timeoutHandle = $(element).data(TIMEOUT_HANDLE);

    // if it does not exits, or is null, start a new timer
    if (!timeoutHandle) {
        timeoutHandle = setTimeout(function() {
            // invoke the update function and clear the timeout handle
            updateFunction();
            $(element).data(TIMEOUT_HANDLE, null);
        }, 1);

        // associate this timout handle with the DOM element
        $(element).data(TIMEOUT_HANDLE, timeoutHandle);
    }
}

function addStylesFromDropShadow(dropShadow, styleToAddTo) {
    if (dropShadow._enabled()) {
        styleToAddTo.boxShadow = "0px " + dropShadow.height() + "px 5px " + colorToCSS(dropShadow.color());
    } else {
        styleToAddTo.boxShadow = "";
    }
}

function addStylesFromText(text, styleToAddTo) {
    if (text.font.size() > 0) {
        styleToAddTo.fontSize = text.font.size();
    } else {
        // a text size of zero requires some sensible default
        styleToAddTo.fontSize = 14;
    }
    styleToAddTo.color = colorToCSS(text.color());
    styleToAddTo.fontFamily = text.font.family();


    //using javascript

}

function addStylesFromTextShadow(textShadow, styleToAddTo) {
    if (textShadow._enabled()) {
        styleToAddTo.textShadow = textShadow.offset.x() + 'px ' + textShadow.offset.y() + 'px ' + colorToCSS(textShadow.color());
    } else {
        styleToAddTo.textShadow = "";
    }
}

function addStylesFromBackgroundColor(backgroundColor, styleToAddTo) {
    styleToAddTo.backgroundColor = colorToCSS(backgroundColor.color());
}

function addStylesFromColor(color, styleToAddTo) {
    styleToAddTo.backgroundColor = colorToCSS(color());
}

function addStylesFromTintColor(tintColor, styleToAddTo) {
    styleToAddTo.backgroundColor = colorToCSS(tintColor.color())
}

function addStylesFromImageTintColor(imageTintColor, styleToAddTo) {
    styleToAddTo.backgroundColor = colorToCSS(imageTintColor.color())
}

/**
 * Some CSS styles accept a comma separated list of values.
 * @param styleToAddTo
 * @param property
 * @param value
 */
function appendStyle(styleToAddTo, property,  value) {
    if (value) {     // in case of undefined or empty string
        if (styleToAddTo[property]) {
            styleToAddTo[property] += ", ";
            styleToAddTo[property] += value;
        }
        else {
            styleToAddTo[property] = value;
        }
    }
}
/**
 * Both background gradient and background image affect backgroundImage property.
 * @param backgroundGradient
 * @param styleToAddTo
 */
function addStylesFromBackgroundGradient(backgroundGradient, styleToAddTo) {
    if (backgroundGradient._enabled()) {
        appendStyle(styleToAddTo, "backgroundImage", gradientToCSS(backgroundGradient, false));
    } else {
        // if the gradient is not enabled, we need to add an empty backgroundImage in order
        // to remove any existing background image css properties on the targeted element
        if (!styleToAddTo.hasOwnProperty("backgroundImage")) {
            styleToAddTo.backgroundImage = "";
        }
    }
}

/**
 * Both background gradient and background image affect backgroundImage property.
 * @param backgroundImage
 * @param styleToAddTo
 */
function addStylesFromBackgroundImage(backgroundImage, styleToAddTo) {
    "use strict";
    if (backgroundImage._enabled()) {
        if (backgroundImage.data()) {
            appendStyle(styleToAddTo, "backgroundImage", "url(" + backgroundImage.data() + ")");

            // On tile we need to explicitly set backgroundSize = "", to clear previous value.
            styleToAddTo.backgroundSize = contentModeToCSS(backgroundImage.contentMode());
            // appendStyle(styleToAddTo, "backgroundSize", contentModeToCSS(backgroundImage.contentMode())); // may be empty
        }
    }
    else {
        // if the gradient is not enabled, we need to add an empty backgroundImage in order
        // to remove any existing background image css properties on the targeted element
        if (!styleToAddTo.hasOwnProperty("backgroundImage")) {
            styleToAddTo.backgroundImage = "";
        }
    }
}

function addStylesFromBorder(border, styleToAddTo, zeroWidth) {
    if (border._enabled()) {
        styleToAddTo.borderWidth = zeroWidth ? "0" : border.width();
        styleToAddTo.borderStyle = "solid ";
        styleToAddTo.borderColor = colorToCSS(border.color());
        styleToAddTo.borderRadius = border.cornerRadius() + "px";
    } else {
        styleToAddTo.borderWidth = "";
        styleToAddTo.borderStyle = "";
        styleToAddTo.borderColor = "";
        styleToAddTo.borderRadius = "";
    }
}

// creates the CSS that is used to render the given shadows
function addStylesFromShadow(innerShadow, outerShadow, styleToAddTo) {
    var combinedShadow = "";

    // creates the required CSS string for a single shadow
    function shadowCSS(shadow) {
        return shadow.offset.x() + "px " + shadow.offset.y() + "px " + shadow.radius() + "px " + colorToCSS(shadow.color());
    }

    if (innerShadow._enabled()) {
        combinedShadow += (combinedShadow ? ", " : "") + "inset " + shadowCSS(innerShadow);
    }
    if (outerShadow._enabled()) {
        combinedShadow += (combinedShadow ? ", " : "") + shadowCSS(outerShadow);
    }

    styleToAddTo.boxShadow = styleToAddTo.MozBoxShadow = styleToAddTo.WebkitBoxShadow = combinedShadow;
}

// adapts a style in order to create a style that reflects the highlighted state
function HighlightedStyle(style) {
    var self = this;

    function updateState() {
        // copy all the properties of the style
        for(var property in style) {
            self[property] = style[property];
        }

        // iterate over the state setters. Each one is used as a replacement for the
        // regular style property
        for (var i = 0; i < style.stateSetters().length; i++) {
            var stateSetter = style.stateSetters()[i];
            var value = stateSetter.value;
            // the enabled state is only used for the normal state property, here we duplicate
            // the state within the corresponding state setter
            if (value.hasOwnProperty("_enabled")) {
                if (self[stateSetter.propertyName]) {
                    value._enabled(self[stateSetter.propertyName]._enabled());
                } else {
                    console.error("A state setter for a non existant property has been found", stateSetter.propertyName);
                }
            }
            self[stateSetter.propertyName] = stateSetter.value;
        }
    }

    updateState();

    // observe changes in the highlighted state in order to update this style
    style.stateSetters.subscribe(updateState);

    // create a computed observabel that is dependant on the _enabled observable of each property
    // and use this in order to trigger an update
    ko.computed(function () {
        for (var property in style) {
            if (style[property].hasOwnProperty("_enabled")) {
                style[property]._enabled();
            }
        }
    }).subscribe(updateState);
}

// wraps a view model style in order to expose either a normal or highlighted style
function StyleWrapperViewModel(style) {
    var adaptedStyle = style;
    var highlightedStyle = new HighlightedStyle(style);

    this.normalStyle = style;
    this.highlightedStyle = highlightedStyle;
    this.activeStyle = style;
}

// a base 'class' for control bindings
function ControlPreviewBindingBase() {
    "use strict";
    var self = this;

    this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // create the UI for this preview
        this.createControlTemplate($(element), allBindingsAccessor());

        // adapt the style supplied by the model
        var styleAdapter = new StyleWrapperViewModel(valueAccessor());
        $(element).data("styleAdapter", styleAdapter);

        // on hover change the active style to the highlighted style
        $(element).hover(function() {
            styleAdapter.activeStyle = styleAdapter.highlightedStyle;
            self.updateControlTemplate($(element), styleAdapter.activeStyle);
        }, function() {
            styleAdapter.activeStyle = styleAdapter.normalStyle;
            self.updateControlTemplate($(element), styleAdapter.activeStyle);
        });
    };

    this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var styleAdapter = $(element).data("styleAdapter");

        // this will 'magically' cause knockout to update this binding if any observable property on
        // the style changes.
        var dependency = ko.toJS(styleAdapter.activeStyle),
            self = this;

        // defer the update
        deferredUpdate(element, function() {
            self.updateControlTemplate($(element), styleAdapter.activeStyle);
        });
    };
}

// a custom binding to ButtonStyle instances
function ButtonPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        var title = allBindingsAccessor.controlPreviewTitle || "Button";
        var extraStyle = allBindingsAccessor.controlPreviewCustomStyleSelector;

        $(element).append("<div class='control-sample button-sample " + extraStyle +"'>" +
                                "<div class='background-layer'> </div>" +
                                "<div class='text-layer'>" + title + "</div>" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, buttonStyle) {
        // create the CSS objects
        var controlLabelStyles = {};
        var outerDivStyles = {};

        // construct the CSS from the various style properties
        addStylesFromText(buttonStyle.title, controlLabelStyles);
        addStylesFromBackgroundColor(buttonStyle.backgroundColor, outerDivStyles);

        // background image accepts a stack of images as a list of values with the first being closest to user.
        addStylesFromBackgroundImage(buttonStyle.backgroundImage, outerDivStyles);
        addStylesFromBackgroundGradient(buttonStyle.backgroundGradient, outerDivStyles);
        addStylesFromBorder(buttonStyle.border, outerDivStyles);
        addStylesFromShadow(buttonStyle.innerShadow, buttonStyle.outerShadow, outerDivStyles);
        addStylesFromTextShadow(buttonStyle.titleShadow, controlLabelStyles);

        // apply the style
        $(element).find(".text-layer").css(controlLabelStyles);
        $(element).find(".background-layer").css(outerDivStyles);
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding to ImageViewStyle instances
function ImageViewPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        $(element).append("<div class='control-sample imageview-sample'>" +
                            "<img src='images/placeholder.png' />" +
                          "</div>");
    };

    this.updateControlTemplate = function (element, imageViewStyle) {
        // create the CSS objects
        var outerDivStyles = {};

        // construct the CSS from the various style properties
        addStylesFromBackgroundColor(imageViewStyle.backgroundColor, outerDivStyles);
        addStylesFromBackgroundGradient(imageViewStyle.backgroundGradient, outerDivStyles);
        addStylesFromBorder(imageViewStyle.border, outerDivStyles);
        addStylesFromShadow(imageViewStyle.innerShadow, imageViewStyle.outerShadow, outerDivStyles);

        // apply the style
        $(element).find("img").css(outerDivStyles);
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding to TableViewCellStyle instances
function TableViewCellPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        var title = allBindingsAccessor.controlPreviewTitle || "Table Cell Item";
        $(element).append("<div class='control-sample tableviewcell-sample'>" +
                                "<div class='background-layer'> </div>" +
                                "<div class='text-layer'>" + title + "</div>" +
                                "<img src='images/iosArrow.png' />" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, tableViewCellStyle) {
        // create the CSS objects
        var controlLabelStyles = {};
        var outerDivStyles = {};

        // construct the CSS from the various style properties
        addStylesFromText(tableViewCellStyle.title, controlLabelStyles);
        addStylesFromBackgroundColor(tableViewCellStyle.backgroundColor, outerDivStyles);
        addStylesFromBackgroundImage(tableViewCellStyle.backgroundImage, outerDivStyles);
        addStylesFromBackgroundGradient(tableViewCellStyle.backgroundGradient, outerDivStyles);
        addStylesFromBorder(tableViewCellStyle.border, outerDivStyles);
        addStylesFromShadow(tableViewCellStyle.innerShadow, tableViewCellStyle.outerShadow, outerDivStyles);
        addStylesFromTextShadow(tableViewCellStyle.titleShadow, controlLabelStyles);

        // apply the style
        $(element).find(".text-layer").css(controlLabelStyles);
        $(element).find(".background-layer").css(outerDivStyles);
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding to NavigationBarStyle instances
function NavigationBarPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        var title = allBindingsAccessor.controlPreviewTitle || "Title";
        $(element).append("<div class='control-sample navigation-bar-sample'>" +
                                "<div class='background-layer'> </div>" +
                                "<div class='tint-layer'> </div>" +
                                "<div class='text-layer'>" + title + "</div>" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, navigationBarStyle) {
        // create the CSS objects
        var controlLabelStyles = {};
        var outerDivStyles = {};
        var tintDivLayer = {};

        // construct the CSS from the various style properties
        addStylesFromText(navigationBarStyle.title, controlLabelStyles);
        addStylesFromTextShadow(navigationBarStyle.titleShadow, controlLabelStyles);
        addStylesFromBackgroundImage(navigationBarStyle.backgroundImage, outerDivStyles);
        addStylesFromBackgroundColor(navigationBarStyle.backgroundColor, outerDivStyles);
        addStylesFromBackgroundGradient(navigationBarStyle.backgroundGradient, outerDivStyles);
        addStylesFromDropShadow(navigationBarStyle.dropShadow, outerDivStyles);
        addStylesFromTintColor(navigationBarStyle.tintColor, tintDivLayer);

        // apply the style
        $(element).find(".text-layer").css(controlLabelStyles);
        $(element).find(".background-layer").css(outerDivStyles);
        $(element).find(".tint-layer").css(tintDivLayer);
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding to TextFieldStyle instances
function TextFieldPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        var title = allBindingsAccessor.controlPreviewTitle || "Text Field";
        $(element).append("<div class='control-sample textfield-sample'>" +
                                "<div class='background-layer'> </div>" +
                                "<div class='text-layer'>" + title + "</div>" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, textFieldStyle) {
        // create the CSS objects
        var controlLabelStyles = {};
        var outerDivStyles = {};

        // construct the CSS from the various style properties
        addStylesFromText(textFieldStyle.title, controlLabelStyles);
        addStylesFromBackgroundColor(textFieldStyle.backgroundColor, outerDivStyles);
        addStylesFromBackgroundGradient(textFieldStyle.backgroundGradient, outerDivStyles);
        addStylesFromBorder(textFieldStyle.border, outerDivStyles);
        addStylesFromShadow(textFieldStyle.innerShadow, textFieldStyle.outerShadow, outerDivStyles);

        // apply the style
        $(element).find(".text-layer").css(controlLabelStyles);
        $(element).find(".background-layer").css(outerDivStyles);
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding to LabelStyle instances
function LabelPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        var title = allBindingsAccessor.controlPreviewTitle || "Label";
        $(element).append("<div class='control-sample label-sample'>" +
                            "<div class='text-layer'>" + title + "</div>" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, labelStyle) {
        // create the CSS objects
        var controlLabelStyles = {};

        // construct the CSS from the various style properties
        addStylesFromText(labelStyle.title, controlLabelStyles);
        addStylesFromTextShadow(labelStyle.titleShadow, controlLabelStyles);

        // apply the style
        $(element).find(".text-layer").css(controlLabelStyles);
    };

    ControlPreviewBindingBase.call(this);
}

// creates the styles based on the passed view controller style
function createViewControllerStyles(element, viewControllerStyle) {
    // create the CSS objects
    var outerDivStyles = {};

    // construct the CSS from the various style properties
    addStylesFromBackgroundColor(viewControllerStyle.backgroundColor, outerDivStyles);
    addStylesFromBackgroundImage(viewControllerStyle.backgroundImage, outerDivStyles);
    addStylesFromBackgroundGradient(viewControllerStyle.backgroundGradient, outerDivStyles);

    return outerDivStyles;
}

// a custom binding to ViewControllerStyle instances
function ViewControllerPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        $(element).append("<div class='control-sample'>" +
                                "<div class='background-layer'> </div>" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, viewControllerStyle) {
        $(element).find(".background-layer").css(createViewControllerStyles(element, viewControllerStyle));
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding that applies the view controller style to the bound element, this is used to style
// the background that is behind the other control previews
function ViewControllerStyleBinding() {
    "use strict";
    this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).css(createViewControllerStyles(element, valueAccessor()));
    };
}

// a custom binding to SwitchStyle instances
function SwitchPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        $(element).append("<div class='control-sample switch-sample'>" +
                                "<div class='background-layer'> </div>" +
                                "<div class='highlight-layer'> </div>" +
                                "<div class='text-layer'>ON</div>" +
                                "<div class='thumb-layer'> </div>" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, switchStyle) {
        // create the CSS objects
        var controlLabelStyles = {};
        var outerDivStyles = {};
        var thumbDivStyles = {};
        var highlightDivStyles = {};

        // switch
        addStylesFromText(switchStyle.onState.textStyle, controlLabelStyles);
        addStylesFromColor(switchStyle.onState.backgroundColor, outerDivStyles);
        addStylesFromBorder(switchStyle.border, outerDivStyles);
        addStylesFromShadow(switchStyle.innerShadow, switchStyle.outerShadow, outerDivStyles);
        // thumb
        addStylesFromBorder(switchStyle.thumbBorder, thumbDivStyles);
        addStylesFromBackgroundColor(switchStyle.thumbBackgroundColor, thumbDivStyles);
        addStylesFromBackgroundGradient(switchStyle.thumbBackgroundGradient, thumbDivStyles);
        addStylesFromShadow(switchStyle.thumbInnerShadow, switchStyle.thumbOuterShadow, thumbDivStyles);
        // highlight
        addStylesFromBackgroundColor(switchStyle.highlightColor, highlightDivStyles);
        addStylesFromBorder(switchStyle.border, highlightDivStyles, true);

        // this is a bit hacky! we need to inset the highlight based on the border cornerRadius. Due to the
        // way this element is styled, we need to explicitely set its width.
        if (switchStyle.border._enabled()) {
            highlightDivStyles["margin-left"] = switchStyle.border.cornerRadius() / 2;
            highlightDivStyles.width = 70 - switchStyle.border.cornerRadius();
        }

        // the switch state specifies the border color, so apply directly here
        outerDivStyles.borderColor = colorToCSS(switchStyle.onState.borderColor());

        // apply the thumb insets
        thumbDivStyles.width = SWITCH_PREVIEW_HEIGHT - switchStyle.thumbInset() * 2;
        thumbDivStyles.height = SWITCH_PREVIEW_HEIGHT - switchStyle.thumbInset() * 2;
        thumbDivStyles.margin = switchStyle.thumbInset();

        // apply the style
        var $element = $(element);
        $element.find(".text-layer").css(controlLabelStyles);
        $element.find(".background-layer").css(outerDivStyles);
        $element.find(".thumb-layer").css(thumbDivStyles);
        $element.find(".highlight-layer").css(highlightDivStyles);

        // add the on-state text
        $element.find(".text-layer").html(switchStyle.onState.text());
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding to SliderStyle instances
function SliderPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        $(element).append("<div class='control-sample slider-sample'>" +
                                "<div class='maximum-track-layer track-layer'> </div>" +
                                "<div class='minimum-track-layer track-layer'> </div>" +
                                "<div class='thumb-layer'> </div>" +
                           "</div>");
    };

    this.updateControlTemplate = function (element, sliderStyle) {
        // create the CSS objects
        var outerDivStyles = {};
        var thumbDivStyles = {};
        var minimumTrackStyles = {};
        var maximumTrackStyles = {};

        // minimum Track
        addStylesFromBackgroundColor(sliderStyle.minimumTrackColor, minimumTrackStyles);
        addStylesFromBackgroundGradient(sliderStyle.minimumTrackBackgroundGradient, minimumTrackStyles);
        addStylesFromBorder(sliderStyle.barBorder, minimumTrackStyles);
        addStylesFromShadow(sliderStyle.barInnerShadow, sliderStyle.barOuterShadow, minimumTrackStyles);
        // maximum Track
        addStylesFromBackgroundColor(sliderStyle.maximumTrackColor, maximumTrackStyles);
        addStylesFromBackgroundGradient(sliderStyle.maximumTrackBackgroundGradient, maximumTrackStyles);
        addStylesFromBorder(sliderStyle.barBorder, maximumTrackStyles);
        addStylesFromShadow(sliderStyle.barInnerShadow, sliderStyle.barOuterShadow, maximumTrackStyles);
        // thumb
        addStylesFromBorder(sliderStyle.thumbBorder, thumbDivStyles);
        addStylesFromBackgroundColor(sliderStyle.thumbBackgroundColor, thumbDivStyles);
        addStylesFromBackgroundGradient(sliderStyle.thumbBackgroundGradient, thumbDivStyles);
        addStylesFromShadow(sliderStyle.thumbInnerShadow, sliderStyle.thumbOuterShadow, thumbDivStyles);

        // adjust the height and location of the track
        var trackHeightStyles = {};
        var previewHeight = PREVIEW_HEIGHT;
        trackHeightStyles.height = previewHeight * sliderStyle.barHeightFraction();
        trackHeightStyles["margin-top"] = (previewHeight - trackHeightStyles.height) / 2;

        // apply the style
        var $element = $(element);
        $element.find(".minimum-track-layer").css(minimumTrackStyles);
        $element.find(".maximum-track-layer").css(maximumTrackStyles);
        $element.find(".track-layer").css(trackHeightStyles);
        $element.find(".thumb-layer").css(thumbDivStyles);
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding to NavigationBarStyle instances
function TabBarPreviewBinding() {
    "use strict";
    this.createControlTemplate = function(element, allBindingsAccessor) {
        var title = allBindingsAccessor.controlPreviewTitle || "Title";
        $(element).append(
            "<div class='control-sample tabbar-sample'>" +
                "<div class='background-layer'>" +
                        "<div class='backgroundimage-layer'>" +
                            "<div class='imagetint-layer'></div>" +
                        "</div>" +
                 "</div>" +
            "</div>");
    };

    this.updateControlTemplate = function (element, tabBarStyle) {
        // create the CSS objects
        var backgroundLayerStyles = {};
        var imageTintLayer = {};
        var backgroundImageLayer = {};


        // construct the CSS from the various style properties
        addStylesFromBackgroundImage(tabBarStyle.backgroundImage, backgroundImageLayer);
        addStylesFromBackgroundColor(tabBarStyle.backgroundColor, backgroundLayerStyles);
        addStylesFromBackgroundGradient(tabBarStyle.backgroundGradient, backgroundLayerStyles);
        addStylesFromBorder(tabBarStyle.border, backgroundLayerStyles);
        addStylesFromShadow(tabBarStyle.innerShadow, tabBarStyle.outerShadow, backgroundLayerStyles);
        addStylesFromImageTintColor(tabBarStyle.imageTintColor, imageTintLayer);

        // apply the style
        $(element).find(".background-layer").css(backgroundLayerStyles);
        $(element).find(".imagetint-layer").css(imageTintLayer);
        $(element).find(".backgroundimage-layer").css(backgroundImageLayer);
    };

    ControlPreviewBindingBase.call(this);
}

// a custom binding that dynamically determines the type of style that is being rendered, and selects the
// required binding.
function ControlPreviewBinding() {
    "use strict";
    this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var previewBinding;
        var viewModelInstance = valueAccessor();
        if (viewModelInstance instanceof ButtonStyle) {
            previewBinding = new ButtonPreviewBinding();
        } else if (viewModelInstance instanceof LabelStyle) {
            previewBinding = new LabelPreviewBinding();
        } else if (viewModelInstance instanceof SwitchStyle) {
            previewBinding = new SwitchPreviewBinding();
        } else if (viewModelInstance instanceof ViewControllerStyle) {
            previewBinding = new ViewControllerPreviewBinding();
        } else if (viewModelInstance instanceof TextFieldStyle) {
            previewBinding = new TextFieldPreviewBinding();
        } else if (viewModelInstance instanceof NavigationBarStyle) {
            previewBinding = new NavigationBarPreviewBinding();
        } else if (viewModelInstance instanceof TableViewCellStyle) {
            previewBinding = new TableViewCellPreviewBinding();
        } else if (viewModelInstance instanceof ImageViewStyle) {
            previewBinding = new ImageViewPreviewBinding();
        } else if (viewModelInstance instanceof SliderStyle) {
            previewBinding = new SliderPreviewBinding();
        } else if (viewModelInstance instanceof TabBarStyle) {
            previewBinding = new TabBarPreviewBinding();
        }

        // associate the constructed binding with the DOM element
        $(element).data("controlPreviewBinding", previewBinding);
        previewBinding.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    };

    this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var previewBinding = $(element).data("controlPreviewBinding");
        previewBinding.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    };
}

exports.ControlPreview = ControlPreviewBinding;
exports.ViewController = ViewControllerStyleBinding;
