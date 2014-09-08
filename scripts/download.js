var ko = require('knockout'),
    DownloadPageViewModel = require('./viewModel/downloadPageViewModel');

ko.applyBindings(new DownloadPageViewModel(), document.documentElement);
