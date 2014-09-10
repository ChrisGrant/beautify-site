var ko = require('knockout'),
StateSetter = require('../model/common/stateSetter'),
ErrorReportingService = require('../service/errorReportingService'),
mappedProperties = require('../mapping/properties'),
$ = require("jquery-browserify");
ko.mapping = require('knockout.mapping');

// these are properties on the Theme model object that are not automatically mapped to / from JSON
// TODO: Handle styles
var nonMappedThemeProperties = ["styles", "DEFAULT_ID", "schemaVersion", "id", "isReady", "name", "defaultName", "toJson"];

var jsonSchemaVersion = require('../jsonSchemaVersion.js');

/**
 * As the production data is currently in an unclean state, we check for mismatched names.
 * Note that currently the statesetter code is in this class rather than properties, which is why we filter it out here.
 * @param propertyName
 * @returns
 */
function getPropertyMapper(propertyName) {
    var propertyConfig = null;
    if (propertyName !== "stateSetters") {
        propertyConfig = mappedProperties[propertyName];
        if (!propertyConfig) {
            // Prod data requires cleaning.
            console.warn("No configuration defined for property: ", propertyName);
        }
    }
    return propertyConfig;
}

// updates the state of the given theme to reflect the passed JSON data
function fromJS(json, theme) {
    "use strict";
    if (json.schemaVersion !== jsonSchemaVersion) {
        ErrorReportingService.reportError("ConfigMapping:fromJS - The JSON file has a schema version of [" + json.schemaVersion +
                    "], however this version of beautify-server expects a schema version [" + jsonSchemaVersion + "]");
    }

    theme.schemaVersion = json.schemaVersion;
    mapJSToModelThemeStyles(json.theme, theme.styles);
}

function mapJSToModelThemeStyles(jsonStyles, modelStyles) {
    for (var property in modelStyles) {
        if ($.inArray(property, nonMappedThemeProperties) === -1) {
            styleFromJS(jsonStyles[property], modelStyles[property]);
        }
    }
}

// converts the given theme to JSON

function toJS(theme) {
    "use strict";
    var data = {
        schemaVersion: jsonSchemaVersion,
        id: theme.id(),
        theme: getThemeStylesAsJson(theme)
    };
    return data;
}

// iterates over the theme styles of the given theme, mapping each to JSON
// An example themeStyle is buttonStyle
function getThemeStylesAsJson(theme) {
    "use strict";
    var data = {};
    for (var themeProperty in theme) {
        if ($.inArray(themeProperty, nonMappedThemeProperties) === -1) {
            data[themeProperty] = getStyleAsJson(theme[themeProperty]);
        }
    }
    return data;
}

// maps the properties of the given style to JSON - the mapping
// technique is based on property name

function getStyleAsJson(style) {
    "use strict";
    var data = {};
    for (var styleProperty in style) {
        var mapper = getPropertyMapper(styleProperty);
        if (mapper) {
            var json = mapper.toJS(style[styleProperty]);
            if (mapper.registerChange(json)) {
                if (json) { // null if not enabled
                    data[styleProperty] = json;
                }
            }
            else {
                delete data[styleProperty];
            }
        }
    }

    // remove the state setters for non-enabled models
    var enabledSetters = style.stateSetters().filter(function(setter) {
        var originalProperty = style[setter.propertyName];
        if (originalProperty && "_enabled" in originalProperty) {
            return originalProperty._enabled();
        }
        return true;
    });

    var transformedSetters = enabledSetters.map(transformSetterToJS);

    var mappingConfig = {
        'ignore': ["_enabled"]
    };
    data.stateSetters = ko.mapping.toJS(transformedSetters, mappingConfig);

    return data;
}

function getModelForProperty(propertyName) {
    try {
        var propertyConfig = getPropertyMapper(propertyName);
        return propertyConfig ? propertyConfig.newModel() : null;
    }
    catch (error) {
        console.error("Error getting model for", propertyName, error);
        throw error;
    }
}

function getJsonForProperty(propertyName) {
    try {
        var propertyConfig = getPropertyMapper(propertyName);
        return propertyConfig ? propertyConfig.newJson() : null;
    }
    catch (error) {
        console.error("Error getting json for", propertyName, error);
        throw error;
    }
}

// construct the model-layer state setter that corresponds to the given json state setter
function newStateSetter(jsonStateSetter) {
    "use strict";
    var valueModelObject, stateSetter;

    // use the state setter property name to determine the desired model object type
    var propertyName = jsonStateSetter.propertyName;
    
    // TODO until we clean prod data, this can return null
    valueModelObject = getModelForProperty(propertyName); 
    
    // copy the state across
    ko.mapping.fromJS(jsonStateSetter.value, {}, valueModelObject);

    stateSetter = new StateSetter({
        value: valueModelObject,
        state: jsonStateSetter.state,
        propertyName: jsonStateSetter.propertyName
    });

    return stateSetter;
}

function hasStateSetter(stateSetterCollection, state, property) {
    "use strict";
    return getStateSetter(stateSetterCollection, state, property) !== undefined;
}

function getStateSetter(stateSetterCollection, state, property) {
    "use strict";
    return $.grep(stateSetterCollection, function(stateSetter) {
        return stateSetter.state === state && stateSetter.propertyName === property;
    })[0];
}


// updates the state of the passed style to reflect the state of the JSON style representation

function styleFromJS(jsonStyle, style) {
    "use strict";
    var property, i, stateSetter;

    if (!jsonStyle) {
        console.warn("ConfigMapping:styleFromJS - Expected style " + style.constructor.name + " is missing from JSON");
        return;
    }
    if (!style) {
        console.warn("ConfigMapping:styleFromJS - null style passed to styleFromJS");
        return;
    }

    // map array properties, this emptys the current array-types property on the style, then iterates
    // over the JSON data, adding each to the style, wrapped in the required model

    function mapArrayProperty(propertyName, constructorFunction) {
        style[propertyName].removeAll();
        if (jsonStyle[propertyName]) {
            for (i = 0; i < jsonStyle[propertyName].length; i++) {
                var modelObject = constructorFunction();
                ko.mapping.fromJS(jsonStyle[propertyName][i], {}, modelObject);
                style[propertyName].push(modelObject);
            }
        }
    }
    
    // handle optional properties
    function mapOptionalProperty(propertyName) {
        // check for the presence of a state setter
        var hasStateSetter = jsonStyle.stateSetters && $.grep(jsonStyle.stateSetters, function(setter) {
            return setter.propertyName === propertyName;
        })[0];

        // map the property value if it's present in the json
        if (jsonStyle[propertyName]) {
            //fromJs takes (jsObject /*, inputOptions, target*/)
            ko.mapping.fromJS(jsonStyle[propertyName], {}, style[propertyName]);
        }
        else {
            // If the property is not present in the json then reset the model.
            // TODO: REVIEW CODE
            // I'm assuming that because of all the data binding we can't just swap the model object,
            // But if the default model is not enabled, no json is generated.
            // Hence we generate an enabled model, and use it's json to reset the original model.
            var mapper = getPropertyMapper(propertyName);
            var enabledModel = mapper.newModel();
            enabledModel._enabled(true); // needed for mapping, it will be reset to false below
            var json = mapper.toJS(enabledModel);
            ko.mapping.fromJS(json, {}, style[propertyName]);
        }

        // if the style has a value or state setter for this property, it is enabled
        // Use !! to convert undefined value to boolean false.
        style[propertyName]._enabled(!!(hasStateSetter || jsonStyle[propertyName]));
    }    
    
    // update each property on this style from the JSON data
    for (property in style) {
        if (mappedProperties.isDirectlyMapped(property)) {
            if (style[property].hasOwnProperty("_enabled")) {
                mapOptionalProperty(property);
            } else {
                ko.mapping.fromJS(jsonStyle[property], {}, style[property]);
            }
        } else if (mappedProperties.isColorProperty(property)) {
            style[property].color(jsonStyle[property]);

        } else {            
            // if the property is not listed in any of the arrays at the top of this file - we do
            // not know how to map it!
            if (property !== "stateSetters") {
                console.warn("ConfigMapping:styleFromJS - ConfigMapping does not know how to map the '" + property + "' of the '" +
                                style.constructor.name + "' JavaScript style object");
            }
        }
    }

    // check to see whether the JSON file has any properties that we have not mapped
    for (property in jsonStyle) {
        if (!style.hasOwnProperty(property)) {
            console.warn("ConfigMapping:styleFromJS - The JSON file has a property '" + property + "' for the '" +
                            style.constructor.name + "' style that is not present in the current JavaScript style object");
        }
    }

    var transformedJsonStateSetters; // default to undefined.
    if (jsonStyle.stateSetters) {
        transformedJsonStateSetters = jsonStyle.stateSetters.map(transformSetterFromJS);
    }

    // update the state setters - because we have view models that subscribe to changes in this collection, 
    // the code here does not take the brute-force, destroy then re-create approach. Instead
    // we update based on changes.

    if (style.stateSetters) {

        // update state setters that exist in both
        for (i = 0; i < style.stateSetters().length; i++) {
            stateSetter = style.stateSetters()[i];
            var jsonStateSetter = getStateSetter(transformedJsonStateSetters, stateSetter.state, stateSetter.propertyName);
            if (jsonStateSetter) {
                ko.mapping.fromJS(jsonStateSetter.value, {}, stateSetter.value);
            }
        }

        // check to see if any state setters have been removed
        for (i = 0; i < style.stateSetters().length; i++) {
            stateSetter = style.stateSetters()[i];
            if (!hasStateSetter(transformedJsonStateSetters, stateSetter.state, stateSetter.propertyName)) {
                style.stateSetters.remove(stateSetter);
            }
        }

        // check to see if any state setters have been added
        if (transformedJsonStateSetters) {
            for (i = 0; i < transformedJsonStateSetters.length; i++) {
                stateSetter = transformedJsonStateSetters[i];
                if (!(style.hasOwnProperty(stateSetter.propertyName))) {
                    console.warn("ConfigMapping:styleFromJS - A state setter for the non existant property '" + stateSetter.propertyName + "' was supplied for the '" +
                            style.constructor.name + "' style.");
                } else if (!hasStateSetter(style.stateSetters(), stateSetter.state, stateSetter.propertyName)) {
                    style.stateSetters.push(newStateSetter(stateSetter));
                }
            }
        }
    }
}

/*
 * transformSetter functions
 * An earlier to do statement referenced the following bits of code being duplicated.
 * Although their comments were identical, how they set the value is different, however.
 * I've changed the "transformSetterFromJS" comment to read 'Here we have to wrap them'.
 * - IanT.
 */ 

/**
 * The view model requires that the value of a state setter is itself a view model, 
 * hence colors are wrapped in backgroundColor view model instances. 
 * Here we have to wrap them. A bit yucky.
 */
function transformSetterFromJS(setter) {
    if (mappedProperties.isColorProperty(setter.propertyName)) {
        return {
            propertyName: setter.propertyName,
            state: setter.state,
            value: {
                color: setter.value
            }
        };
    } else {
        return setter;
    }
}

/** 
 * The view model requires that the value of a state setter is itself a view model, 
 * hence colors are wrapped in backgroundColor view model instances. 
 * Here we have to unwrap them. A bit yucky.
 */
function transformSetterToJS(setter) {
    if (mappedProperties.isColorProperty(setter.propertyName)) {
        return {
            propertyName: setter.propertyName,
            state: setter.state,
            value: (setter.value) ? setter.value.color() : undefined // TODO what is the underlying cause?
        };
    } else {
        return setter;
    }
}

exports.toJS = toJS;
exports.fromJS = fromJS;
exports.mapThemeStylesToJS = getThemeStylesAsJson;
exports.mapJStoThemeStyles = mapJSToModelThemeStyles;
exports.mapStyleToJS = getStyleAsJson;
