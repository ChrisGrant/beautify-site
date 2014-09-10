/**
 * Mapping Properties
 * These are the properties that are available for mapping by ConfigMapping.
 * Defining them explicitly here can serve as the basis for json validation.
 *
 * TODO:
 * Existing behaviour:
 *   Directly mapped properties without associated MappedProperty, since no associated model.
 *      barHeightFraction, thumbInset
 *   Color - returns model.color as json.
 * Currently we've directly extracted the static property methods from ConfigMapping and require them back.
 * The intention is that PropertyConfigurations class can evolve into having these as object methods.
 */
 
// Global??
$ = require("jquery-browserify");

var ko = require('knockout');
ko.mapping = require('knockout.mapping');
 
var Shadow = require('../model/common/shadow'),
	SwitchState = require('../model/common/switchState'),
	Border = require('../model/common/border'),
	Text = require('../model/common/text'),
	TextShadow = require('../model/common/textShadow'),
	BackgroundColor = require('../model/common/color'),
	BackgroundImage = require('../model/common/backgroundImage'),
	Gradient = require('../model/common/gradient'),
	DropShadow = require('../model/common/dropShadow');

// these are properties that can be mapped between the 'model layer' and the JSON directly
// via ko.mapping
var directlyMappedProperties = ["barHeightFraction", "title", "onState", "offState", "barBorder", "backgroundGradient", "backgroundImage", "thumbBackgroundGradient",
             "thumbBackgroundImage", "titleShadow", "border", "dropShadow", "maximumTrackBackgroundGradient", "minimumTrackBackgroundGradient", "thumbBorder",
             "thumbInset", "barHeightFraction", "shadow", "innerShadow", "outerShadow", "titleShadow", "thumbInnerShadow",
            "thumbOuterShadow", "barInnerShadow", "barOuterShadow"];

// these are properties that are of type Color
var colorProperties = ["backgroundColor", "thumbBackgroundColor", "highlightColor", "maximumTrackColor", "minimumTrackColor", "imageTintColor", "tintColor"];

/**
 * Interim function
 */
function isDirectlyMapped(property) {
	return ($.inArray(property, directlyMappedProperties) !== -1);
}

/**
 * Interim function
 */
function isColorProperty(property) {
    return ($.inArray(property, colorProperties) !== -1);
}

/**
 * Default model mapping - overridden for color.
 */


function MappedProperty(modelConstructor) {
    var self = this;
    
    this.newModel = function() {
        return new modelConstructor();
    };
    
    this.newJson = function() {
        return self.toJS(self.newModel());
    };
    
    this.toJS = function modelToJson(model) {
        var json = null; // for disabled properties.
        var isEnabled = (model.hasOwnProperty("_enabled")) ? model._enabled() : true;
        if (isEnabled) {
            // When adding new properties to our JSON data format, 
            // if we de-serialize a JSON file that does not have the newly added property, 
            // the Knockout mapping process will record which properties were mapped via fromJS, 
            // and, as a result, the newly added property will not be written to JSON via toJS. 
            // Here we fix the problem by explicitly telling knockout to map all the properties of our object.
            var mappingConfig = {
                'ignore': ["_enabled", "__ko_mapping__"],
                'include': Object.keys(model)
            };
            json = ko.mapping.toJS(model, mappingConfig);
        }
        return json;
    };

    this.registerChange = function(model) {
        return true;
    };
}

/*
 * We only want to map a background image if it contains some image data, otherwise it is considered
 * invalid. This mapper adapts the generic MappedProperty mapper in order to check this constraint.
 */
function MappedBackgroundImage() {
    var adaptedMapper = new MappedProperty(BackgroundImage);

    this.newModel = adaptedMapper.newModel;
    this.newJson = adaptedMapper.newJson;

    this.toJS = function(model) {
        return adaptedMapper.toJS(model);
    };

    this.registerChange = function(model) {
        if(model) {
            return !!model.data;
        }
        else {
            return true;
        }
    };
}

function MappedColorProperty() {
    MappedProperty.apply(this, [BackgroundColor]);
    
    this.toJS = function(model) {
        // TODO: I'd have expected we want to return toJS(model.color),
        // rather than just return model.color.
        return model.color();
    };
}

/**
 * Represents ko observable.
 * @returns
 */
function MappedAtomicProperty() {
    MappedProperty.apply(this, [String]);
}

var mappedProperties = {
	title: new MappedProperty(Text),
	titleShadow : new MappedProperty(TextShadow),
	dropShadow : new MappedProperty(DropShadow),
	backgroundColor : new MappedColorProperty(),
	thumbBackgroundColor : new MappedColorProperty(),
	highlightColor : new MappedColorProperty(),  // Still relevant?
	maximumTrackColor : new MappedColorProperty(), // Still relevant?
	minimumTrackColor : new MappedColorProperty(), // Still relevant?
	backgroundGradient : new MappedProperty(Gradient),
	thumbBackgroundGradient : new MappedProperty(Gradient),
	maximumTrackBackgroundGradient : new MappedProperty(Gradient),
	minimumTrackBackgroundGradient : new MappedProperty(Gradient),
	backgroundImage : new MappedBackgroundImage(),
	thumbBackgroundImage : new MappedProperty(BackgroundImage),
	thumbInset : new MappedAtomicProperty(),
	border : new MappedProperty(Border),
	barBorder : new MappedProperty(Border),
	thumbBorder : new MappedProperty(Border),
	onState : new MappedProperty(SwitchState),
	offState : new MappedProperty(SwitchState),
	shadow : new MappedProperty(Shadow),
	innerShadow : new MappedProperty(Shadow),
	outerShadow : new MappedProperty(Shadow),
	thumbInnerShadow : new MappedProperty(Shadow),
	thumbOuterShadow : new MappedProperty(Shadow),
	barInnerShadow : new MappedProperty(Shadow),
	barOuterShadow : new MappedProperty(Shadow),
	barHeightFraction : new MappedAtomicProperty(),
    tintColor : new MappedColorProperty(),
    imageTintColor : new MappedColorProperty()
};

module.exports = mappedProperties;
module.exports.isDirectlyMapped = isDirectlyMapped;
module.exports.isColorProperty = isColorProperty;