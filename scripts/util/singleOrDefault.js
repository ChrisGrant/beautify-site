var $ = require("jquery-browserify");

// wrap jQuery grep to provide an easy way to search an array for a single matching item
function singleOrDefault(arr, match) {
    var matches = $.grep(arr, match);
    if (matches.length === 1) {
        return matches[0];
    }
    return undefined;
}


module.exports = singleOrDefault;