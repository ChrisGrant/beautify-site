var $ = require("jquery-browserify");

function MappingFilter(filterArray) {

    this.filter = function(key, value) {
        if ($.inArray(key, filterArray) != "-1") {
            return undefined;
        }
        else {
            return value;
        }
    }
}
module.exports = MappingFilter;