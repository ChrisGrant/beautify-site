var ko = require('knockout'),

    // model object dependencies
    Shadow = require('../../model/common/shadow'),
    StateSetter = require('../../model/common/stateSetter'),
    Border = require('../../model/common/border'),
    TextShadow = require('../../model/common/textShadow'),
    Gradient = require('../../model/common/gradient'),
    BackgroundImage = require('../../model/common/backgroundImage'),
    Color = require('../../model/common/color'),
    SwitchState = require('../../model/common/switchState'),
    Text = require('../../model/common/text');
    
    // view model dependencies
    TextViewModel = require('./common/textViewModel'),
    BorderViewModel = require('./common/borderViewModel'),
    TextShadowViewModel = require('./common/textShadowViewModel'),
    ShadowViewModel = require('./common/shadowViewModel'),
    GradientEditorViewModel = require('./common/gradientEditorViewModel'),
    BackgroundImageEditorViewModel = require('./common/backgroundImageEditorViewModel'),
    SwitchStateViewModel = require('./common/switchStateViewModel'),
    EditColorViewModel = require('./common/editColorViewModel');

    $ = require("jquery-browserify");

/**
 * Search for matching state setters within the collection.
 * Default to search for state 'highlighted'
 * @param setterCollection
 * @param propertyName
 * @param state
 * @returns
 */
function locateStateSetter(setterCollection, propertyName, state) {
    if (typeof (state) === 'undefined') {
        state = "highlighted";
    }

    return $.grep(setterCollection, function(stateSetter) {
        return stateSetter.state === state && stateSetter.propertyName === propertyName;
    })[0];
}

/**
 * A view model which exposes a view model for configuring the UI state relating to a single property of the control, 
 * and a second view model which represents the corresponding highlighted state of the same view model
 * 
 * When a new theme is loaded, the underlying model for this viewModel has it's stateSetters updated.
 * We subscribe to these changes and, if the state setter matches the property, 
 * we update whether or not the highlighted view model should be displayed or not.
 * 
 * This constructor is called by the specific constructors below
 */
function HighlightedStateViewModel(style, propertyName, viewModelFactory, modelCloner) {
    "use strict";
    
    var that = this;

    // The underlying view model
    this.viewModel = viewModelFactory(style[propertyName], false);
    
    //--- configure the view templates
    // the template used to render this view model 
    this.template = "highlightedStateView";

    // the template used to render the view model which this view model adapts (adding the higlighted state concept)
    this.propertyTemplate = this.viewModel.template;

    // the template used to render the example of what the property application should look like
    this.propertyPreviewTemplate = this.viewModel.previewTemplate;
    this.previewTemplate = "highlightedPreviewTemplate";

    // delegate to the adapted view model to get a name for this property
    this.propertyTitle = this.viewModel.propertyTitle;
    
    // expose the underlying enabled property
    // There's a binding test of: $data.hasOwnProperty('enabled') && !enabled() 
    if (this.viewModel.hasOwnProperty("enabled")) {
        this.enabled = this.viewModel.enabled;
    }
    
    // --- local variables required to calculate public properties ---
        
    // Whether we have a highlighted state setter depends on the content of the style's state setter array.
    var highlightedStateSetter = ko.observable();
   
    // The view model is based on the state setter
    this.highlightedViewModel = ko.observable();
    
    this.hasHighlightedState = ko.computed(function calculateHasHighlightedStateFromViewModel() { 
        return (that.highlightedViewModel() !== undefined) ; 
    });   
    
    // subscribe to the state setters array in order to observe whether a relevant setter has been added or removed.
    // This corresponds to the model being changed by loading a different theme, 
    // so apply any changes to the highlight state setter.
    style.stateSetters.subscribe(function onStyleStateSettersChanged (newValue) {
        var currentStateSetter = highlightedStateSetter();
        var revisedStateSetter = locateStateSetter(style.stateSetters(), propertyName);
        
        if (revisedStateSetter !== currentStateSetter) {
            highlightedStateSetter(revisedStateSetter);  // will notify changes down the line.
        }
    });
    
    // When the state setter changes, apply these changes to the view model 
    highlightedStateSetter.subscribe(function onHighlightedStateSetterChanged (newStateSetter) {        
        var newViewModel = (newStateSetter) ? viewModelFactory(newStateSetter.value, true) : undefined;
        that.highlightedViewModel(newViewModel); // will trigger change to hasHighlightedViewModel.
    });
    
    /**
     * Go into a highlighted state by adding a new highlighted state setter to the list.
     */
    function createHighlightedState() {
        var clonedModel = modelCloner(style);
        
        // add as a state setter
        var newStateSetter = new StateSetter({
            value: clonedModel,
            state: "highlighted",
            propertyName: propertyName
        });
    
        // add to the state setters, this will trigger updates to highlightedStateSetter
        style.stateSetters.push(newStateSetter);
    }
    
    /*
     * Remove the current state setter from the style setters, triggering downstream changes.
     */
    function clearHighlightedState() {
        var currentStateSetter =  highlightedStateSetter();

        // remove the state setter from the style model
        // this will trigger updates to the highlightedStateSetter etc.
        if (currentStateSetter) {
            style.stateSetters.remove(currentStateSetter);
        }
    }
    
    // ------ Public methods -------

    this.toggleHighlighted = function() {
        if (that.hasHighlightedState()) {
            clearHighlightedState();
        }
        else {
            createHighlightedState();
        }
    };
}

// =========== Other Public Constructors ==============
// A number of functions that create view models, based on the HighlightedStateViewModel, for specific style properties 

function SwitchStateTabViewModel(style, propertyName, propertyTitle) {
    return new HighlightedStateViewModel(style, propertyName, function(switchState, highlighted) {
        return new SwitchStateViewModel(switchState, propertyTitle);
    }, function(style) {
        return new SwitchState(style[propertyName]);
    });
}

function TitleTabViewModel(style) {
    return new HighlightedStateViewModel(style, "title", function(title, highlighted) {
        return new TextViewModel(title);
    }, function(style) {
        return new Text(style.title);
    });
}

function ShadowTabViewModel(style, propertyName, propertyTitle) {
    propertyName = propertyName || "shadows";
    return new HighlightedStateViewModel(style, propertyName, function(shadow, highlighted) {
        return new ShadowViewModel(shadow, propertyTitle);
    }, function(style) {
        return new Shadow(style[propertyName]);
    });
}

function BorderTabViewModel(style, propertyName, propertyTitle) {
    propertyName = propertyName || "border";
    return new HighlightedStateViewModel(style, propertyName, function(border, highlighted) {
        return new BorderViewModel(border, propertyTitle);
    }, function(style) {
        return new Border(style[propertyName]);
    });
}

function ColorTabViewModel(style, propertyName, propertyTitle) {
    propertyName = propertyName || "Color";
    return new HighlightedStateViewModel(style, propertyName, function(color, highlighted) {
        return new EditColorViewModel(color, propertyTitle);
    }, function(style) {
        return new Color(style[propertyName]);
    });
}

function TitleShadowTabViewModel(style, propertyName, propertyTitle) {
    propertyName = propertyName || "titleShadow";
    return new HighlightedStateViewModel(style, propertyName, function(titleShadow, highlighted) {
        return new TextShadowViewModel(titleShadow, propertyTitle);
    }, function(style) {
        return new TextShadow(style[propertyName]);
    });
}

function GradientTabViewModel(style, propertyName, propertyTitle) {
    propertyName = propertyName || "backgroundGradient";
    return new HighlightedStateViewModel(style, propertyName, function(backgroundGradient, highlighted) {
        return new GradientEditorViewModel(backgroundGradient, propertyTitle);
    }, function(style) {
        return new Gradient(style[propertyName]);
    });
}

function ImageTabViewModel(style, parent, propertyName) {
    propertyName = propertyName || "backgroundImage";
    return new HighlightedStateViewModel(style, propertyName, function(backgroundImage, highlighted) {
        return new BackgroundImageEditorViewModel(backgroundImage, parent, highlighted);
    }, function(style) {
        return new BackgroundImage(style[propertyName]);
    });
}

exports.Highlighted = HighlightedStateViewModel;
exports.Title = TitleTabViewModel;
exports.TitleShadow = TitleShadowTabViewModel;
exports.Border = BorderTabViewModel;
exports.Shadow = ShadowTabViewModel;
exports.SwitchState = SwitchStateTabViewModel;
exports.Color = ColorTabViewModel;
exports.Gradient = GradientTabViewModel;
exports.Image = ImageTabViewModel;
