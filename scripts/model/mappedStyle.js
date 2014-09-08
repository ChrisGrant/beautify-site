/**
 * A MappedStyle manages it's state via stateSetters.
 */
var ko = require('knockout');

function MappedStyle (copy) {
    "use strict";
    this.stateSetters = ko.observableArray();
    if (copy) {
        this.stateSetters(copy.stateSetters());
    }
}

module.exports = MappedStyle;