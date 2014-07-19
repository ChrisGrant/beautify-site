var ko = require('knockout'),
    TestViewModel = require('./viewModel/testViewModel');

ko.applyBindings(new TestViewModel(), document.documentElement);