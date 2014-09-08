var ko = require('knockout');

// with JQuery when you set the various style prpoerties on a DOM element, jQuery 'magically' adds the required units. For example, if you set 
// cornerRadius = '15', jQuery will append 'px', e.g. cornerRadius = '15px'. This custom binding emulates that behaviour so that Knockout bindings 
// do not required units.
module.exports = ko.bindingHandlers.$tyle = {
    'update': function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor() || {});
        for (var styleName in value) {
            if (typeof styleName == "string") {
                var styleValue = ko.utils.unwrapObservable(value[styleName]);
                if (typeof(styleValue) == 'number') {
                    styleValue += 'px';
                }
                if (styleName == 'backgroundImage' && styleValue.substr(0, 4) != 'url(') {
                    styleValue = 'url(' + styleValue + ')';
                }
                element.style[styleName] = styleValue || ""; // Empty string removes the value, whereas null/undefined have no effect
            }
        }
    }
};
