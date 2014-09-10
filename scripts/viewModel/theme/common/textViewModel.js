var ko = require('knockout'),
    ColorViewModel = require('./colorViewModel'),
    FontViewModel = require('./fontViewModel'),
    NumberChanger = require('./numberChanger');

// text view model adapts a text model

function TextViewModel(text) {

    this.template = "titleView";
    this.previewTemplate = "titleViewPreview";
    this.propertyTitle = "Text";

    // adapted properties
    this.color = new ColorViewModel(text.color);
    this.font = new FontViewModel(text.font);

    /*
     * FontNumberDecorator 
     * Font size should be decorated such that it displays with a 'pt' suffix, 
     * except where the value is 0.
     */
    var suffixDecorator = new NumberChanger.Suffix('pt');
    var fontNumberDecorator = {
        apply : function (undecorated) {
            return (undecorated === 0) ? "default" : suffixDecorator.apply(undecorated);
        },
        undo : function(decorated) {
            return (decorated == "default") ? 0 : suffixDecorator.undo(decorated);
        }
    };
    this.font.fontSizeChanger = new NumberChanger(this.font.size, 72, 0, [], fontNumberDecorator);
}

module.exports = TextViewModel;
