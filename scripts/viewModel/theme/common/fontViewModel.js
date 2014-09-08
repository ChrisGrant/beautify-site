var ko = require('knockout'),
$ = require("jquery-browserify");

// font view model adapts a font model

function FontViewModel(font) {

    var self = this;
    // straight-through properties
    self.family = font.family;
    self.size = font.size;
    self.style = font.style;
    self.fontSizeChanger = font.fontSizeChanger;
    self.fonts = require('./fonts.js');
    self.possibleStyles = require("./styles");

    self.styles = ko.computed(
        function() {
            return self.possibleStyles[self.family()];
        }
    );

}

module.exports = FontViewModel;
