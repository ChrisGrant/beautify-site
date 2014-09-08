/**
 * Provide the methods to load and save themes via Parse.
 * see https://www.parse.com/docs/js/symbols/Parse.Query.html
 *
 * For returned errors
 * see https://www.parse.com/docs/js/symbols/Parse.Error.html
 */

/*global Parse, require, exports */
var $ = require("jquery-browserify"),
    configMapping = require('./../viewModel/configMapping'),
    ThemeViewModel = require('../viewModel/themeViewModel'),
    ErrorReportingService = require('./errorReportingService'),
    parseInit = require('./parseInitialize');

var jsonSchemaVersion = require('../jsonSchemaVersion.js');
// the parse 'class' name for themes
var themeClassName = "Theme_" + jsonSchemaVersion.replace(".", "_");
var Theme = Parse.Object.extend(themeClassName);
var DEFAULT_PARSE_FILE_NAME = "theme.json";

//the timeout, in milliseconds, for requests made to the Parse APIs via ajax
var parseTimeout = 10000;

/**
 * Invoke the query to return theme parse objects.
 * @param query
 * @param onSuccess
 * @param onError
 */
var invokeQuery = function(query, onSuccess, onError) {
    "use strict";
    query.descending("updatedAt");
    query.include("user");
    query.find({
        success: function(results) {
            console.log("Themes:invokeQuery - Successfully retrieved " + results.length + " theme(s).");
            if (onSuccess) {
                onSuccess(results);
            }
        },
        error: function(error) {
            ErrorReportingService.reportError("Themes:invokeQuery - " + error.code + " " + error.message);
            if (onError) {
                onError(error);
            }
        }
    });
};

/** Json string is passed around elsewhere
 * Encode as base64
 * @param decodedData
 * @returns {Parse.File}
 */
function createFileFromJsonString(decodedData) {
    "use strict";
    // accepts base64-encoded string
    // @see https://www.parse.com/docs/js/symbols/Parse.File.html
    var base64 = btoa(decodedData);
    return new Parse.File(DEFAULT_PARSE_FILE_NAME, { base64: base64 });
}

function parseFileFromTheme(jsonConfig) {
    "use strict";
    var decodedData = JSON.stringify(jsonConfig);
    return createFileFromJsonString(decodedData);
}

/**
 * Publically exported constructor.
 */
function Themes() {
    "use strict";

    var self = this;
    /**
     * @param user - to serve as key
     * @param onSuccess callback(themes)
     * @param onError callback(error)
     * (Splitting into two callbacks aids sinon mocking).
     *
     */
    this.getUserThemes = function(user, onSuccess, onError) {
        var query = new Parse.Query(Theme);
        query.equalTo("user", user.parseUser);
        query.equalTo("default", false);
        invokeQuery(query, onSuccess, onError);
    };

    this.getDefaultThemes = function(onSuccess, onError) {
        var sharedQuery = new Parse.Query(Theme);
        sharedQuery.equalTo("shared", true);

        var defaultQuery = new Parse.Query(Theme);
        defaultQuery.equalTo("default", true);

        var nonUserQuery = Parse.Query.or(defaultQuery, sharedQuery);

        invokeQuery(nonUserQuery, onSuccess, onError);
    };

    /**
     * Create themeViewModel from new parse object.
     */
    this.createUserTheme = function (themeName, file, onNewTheme, onError) {
        var themeObject = new Parse.Object(themeClassName);
        themeObject.set("user", Parse.User.current());
        themeObject.set("file", file);
        themeObject.set("name", themeName);
        themeObject.set("default", false);

        themeObject.save().then(function () {
            console.log("Themes:createUserTheme - New theme saved: " + themeName);
            if (onNewTheme) {
                onNewTheme(themeObject);
            }
        }, function (error) {
            ErrorReportingService.reportError("Themes:createUserTheme - could not save the theme! " + themeName);
            if (onError) {
                onError(error);
            }
        });
    };

    /**
     * Copy the current theme data into a new ThemeViewModel with the given name.
     * will save as user
     * TODO: save interim json data in the new theme
     * @param json
     * @param themeName
     * @param onNewTheme
     * @param onError
     */
    this.saveThemeAs = function (json, themeName, onNewTheme, onError) {
        var file = parseFileFromTheme(json);
        file.save().then(function (argument) {
            // The file has been saved to Parse. Associate it with a theme object.
            self.createUserTheme(themeName, file, onNewTheme);
        }, function (error) {
            ErrorReportingService.reportError("Themes:saveThemeAs - could not save the file!", themeName);
            if (onError) {
                onError(error);
            }
        });
    };

    /*
     * Send a message to the server in order to delete the given theme file
     */
    this.deleteThemeFile = function(parseFile) {
        var filename = parseFile.name();
        $.ajax({
            url: "/deleteTheme?filename=" + filename,
            success: function(fileContents) {
                console.log("Themes:deleteThemeFile - Deleted theme file", filename);
            },
            error: function(jqXHR, status, errorThrown) {
                console.error("Themes:deleteThemeFile - Unable to delete file", parseFile, status, errorThrown);
            }
        });
    };

    /**
     *
     * Adapted editorViewModel.
     * There are distinct parts
     * (1) saving the json value of the model
     * (2) associating the file with a Parse /Theme that's associated in turn with the user.
     * (3) destroying any previous theme data - this can't be done programmatically at present.
     *
     * An alternative function signature would be to pass in an options object with {success, failure} callback options.
     * Unfortunately sinon.js is unable to mock these - hence better to use
     *  parse.Promise.then(success, failure).
     * @param themeViewModel - parent parse object
     * @param json - string data
     * @param onSuccess - resolved callback
     * @param onError - rejected callback
     */
    this.updateTheme = function (themeViewModel, json, onSuccess, onError) {
        var parseTheme = themeViewModel.parseObject;
        var oldFile = parseTheme.get("file");
        var file = createFileFromJsonString(json);

        // save the new theme file
        file.save().then(
            function() {
                // associate the new file with the theme object
                parseTheme.set("file", file);
                console.log("Themes:updateTheme - Saved file: " + file.name());
                parseTheme.save().then(function() {
                    // delete the old file
                    self.deleteThemeFile(oldFile);
                    if (onSuccess) {
                        onSuccess();
                    }
                }, function(error) {
                    ErrorReportingService.reportError("Themes:updateTheme - Unable to save theme with file: " + error.Message);
                    if (onError) {
                        onError(error);
                    }
                });
            },
            function(error) {
                // The file either could not be read, or could not be saved to Parse.
                ErrorReportingService.reportError("Themes:updateTheme -  could not save the file!" + error.Message);
                if(onError) {
                    onError(error);
                }
            }
        );
    };

    /**
     * destroy theme
     * @param themeParseObject - the parse object to be deleted.
     * @param onDeleteSuccess  - o
     * @param onDeleteFailure
     * see https://parse.com/docs/js/symbols/Parse.Object.html#destroy
     */
    this.destroyTheme = function(themeParseObject, onDeleteSuccess, onDeleteFailure) {
        // get file, destroy file
        // destroy this theme

        var file = themeParseObject.get("file");
        themeParseObject.destroy({
            // wait: true, // added to try and get callbacks working.
            success:
                function (deletedObject) {
                    if (onDeleteSuccess) {
                        onDeleteSuccess(deletedObject);
                    }
                },
            error:
                function (undeletedObject, error) {
                    // e.g. code: 101, message: "object not found for delete"
                    ErrorReportingService.reportError("Themes:destroyTheme - unable to destroy: " + undeletedObject.id() +
                            "due to " + error.code + "/" + error.message);
                    if (onDeleteFailure) {
                        onDeleteFailure(error);
                    }
                }
        });

        // Note that orphan File object cannot be directly destroyed,
        // either via javascript api or a delete request from the web application to Parse's rest api
        // (due to the fact that delete requires a MASTER_KEY, but this is rejected in a cross-domain request).
        // Instead request the application server does it.
        self.deleteThemeFile(file);
    };

    /**
     * RenameTheme
     * onFailure pass in Parse.Error https://www.parse.com/docs/js/symbols/Parse.Error.html
     */
    this.renameTheme = function(themeViewModel, newName, onRenameSuccess, onRenameFailure) {
        if (themeViewModel.isUser) {
            themeViewModel.name = newName;
            themeViewModel.parseObject.set("name", newName);
            this.updateThemeAttributes(themeViewModel, onRenameSuccess, onRenameFailure);        
        }
        else {
            ErrorReportingService.reportError("Themes:renameTheme - trying to rename non-User Theme: "+ themeViewModel.id());
        }
    };

    this.updateThemeAttributes = function(themeViewModel, onSuccess, onError) {
        var parseTheme = themeViewModel.parseObject;
        parseTheme.save().then(function() {
            if(onSuccess) {
                onSuccess();
            }
        }, function (error) {
            ErrorReportingService.reportError("Themes:updateThemeAttributes - Unable to update the theme attributes: " + error.Message);
            if(onError) {
                onError();
            }
        });
    };

    /**
     * Read the contents of a parse file.
     */
    this.readFile = function(parseFile, onFileRead) {
        if (parseFile.url) {

            // fetch the file from the Parse APIs
            $.ajax({
                url: parseFile.url(),
                dataType: 'json',
                success: function(fileContents) {
                    if (onFileRead) {
                        onFileRead(fileContents);
                    }
                },
                timeout: parseTimeout,
                error: function(jqXHR, status, errorThrown) {
                    ErrorReportingService.reportError("Themes:readFile" +
                            " - Unable to obtain file contents from the Parse APIs, url="+
                         parseFile.url() + "status=" + status + ", errorThrown=" + errorThrown);
                }
            });
        }
    };
}

var aThemes = new Themes();
module.exports = aThemes;
