var ko = require('knockout'),
    NumberChanger = require('./numberChanger');

/*
 * Note that this is having a text suffix passed in.
 */
function NumericValueViewModel(numericValue, propertyTitle, minValue, maxValue, suffix) {

    this.template = "numericValueView";
    this.propertyTitle = propertyTitle || "Numeric Value";

    var decorator = (suffix) ? new NumberChanger.Suffix(suffix) : undefined;
    
    // adapted properties
    this.numericValue = new NumberChanger(numericValue, maxValue, minValue, [], decorator);
}

module.exports = NumericValueViewModel;
