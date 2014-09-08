/*
  JSON  <->  CSS
  contentMode background-size
  aspect fill : cover
  Fill : 100% 100%
  Tile : no value

  Appearance will default to fill/100% 100%
 */

var ko = require('knockout');

function BackgroundImageEditorViewModel(backgroundImage, styleToAddTo, parent, isHighlightedState) {
    "use strict";
    var viewModel = this;

    this.sourceImageUrl = backgroundImage.data;
    this.sourceImage = ko.observable();

    this.enabled = backgroundImage._enabled;
    this.template = "backgroundImageView";
    this.propertyTitle = "Background Image";

    this.scale = ko.observable(2);
    
    var FILE_NAME_NONE = "No file chosen";
    var FILE_NAME_UPLOADED = "File uploaded";
    this.fileName = ko.observable(FILE_NAME_NONE);
    /**
     * Respond to editor being opened and closed to reset the filename.
     */
    this.enabled.subscribe(function(newValue) {
        if(newValue) {
            var newFileName = (viewModel.sourceImageUrl()) ?  FILE_NAME_UPLOADED : FILE_NAME_NONE;
            viewModel.fileName(newFileName);
        }
    });

    /**
     * Wraps model data.
     */
    this.sourceImageUrl.subscribe(function (value) {       
        // The model should only have a defined content mode if the data is defined
        if (value) {
            backgroundImage.contentMode(viewModel.contentMode());
        }
        else {
            backgroundImage.contentMode(undefined);
        }
    });

    this.contentModes = ko.observableArray([ "fill", "aspectFill", "tile" ]);

    this.contentMode = ko.observable(backgroundImage.contentMode() ? backgroundImage.contentMode() : this.contentModes()[0]);
    this.contentMode.subscribe(function(value) {
        if (backgroundImage.data() && value != backgroundImage.contentMode()) {
            backgroundImage.contentMode(value);
        }
    });
    backgroundImage.contentMode.subscribe(function(value) {
        if (value != viewModel.contentMode()) {
            viewModel.contentMode(value);
        }
    });

    ko.computed(function() {
        var image = new Image();
        image.onload = function() {
            viewModel.sourceImage(image);
        };
        if (viewModel.sourceImageUrl()) {
            image.src = viewModel.sourceImageUrl();
        }
    });

    if (parent) {
        parent.hasImage = ko.computed(function() {
            return this.sourceImageUrl() !== undefined && this.enabled() !== false;
        }, this);
    }

    this.sourceHeight = ko.computed(function() {
        return viewModel.sourceImage() && viewModel.sourceImage().height;
    });

    this.sourceWidth = ko.computed(function() {
        return viewModel.sourceImage() && viewModel.sourceImage().width;
    });

    this.imageHeight = ko.computed(function() {
        return viewModel.sourceHeight() * viewModel.scale();
    });
    
    this.imageWidth = ko.computed(function() {
        return viewModel.sourceWidth() * viewModel.scale();
    });

    this.loadFile = function(file) {
        if (file) {
            var reader = new FileReader();
            reader.onerror = function(e) {
                alert('Error code: ' + e.target.error.code);
            };
            reader.onload = function(evt) {
                viewModel.sourceImageUrl(evt.target.result);
            };
            reader.readAsDataURL(file);
            viewModel.fileName(file.name);
        }
    };
}
module.exports = BackgroundImageEditorViewModel;