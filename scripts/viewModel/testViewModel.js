var ko = require('knockout');

var TestViewModel = function() {
    
    this.test = ko.observable("hello world");
    
};

module.exports = TestViewModel;