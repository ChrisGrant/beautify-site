var ko = require('knockout');

function Text(text) {
    var self = this;
    this.color = ko.observable(text ? text.color() : "#ffffff");
    this.font = {
        "family": ko.observable(text ? text.font.family() : "Helvetica"),
        "size": ko.observable(text && text.font && text.font.size ? text.font.size() : 0),
        "style": ko.observable(text && text.font && text.font.style ? text.font.style() : "Bold")
    };
    this.font.name = ko.computed(
        {
            read: function() {
                if (self.font.style() != "default") {
                    return self.font.family() + "-" + self.font.style();
                } else {
                    return self.font.family();
                }
            },
            write: function(value) {
                //Handling overriding font.name when initializing theme.
            }
        });
}
module.exports = Text;
