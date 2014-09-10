var ko = require('knockout'),
    CustomBinding = require('./customBinding/controlPreviewBinding'),
    DownloadPageViewModel = require('./viewModel/downloadPageViewModel');

ko.bindingHandlers.controlPreview = new CustomBinding.ControlPreview();

ko.applyBindings(new DownloadPageViewModel(), document.documentElement);
ko.bindingHandlers.$tyle = require('./customBinding/knockout.$tyle');

window.ko = ko;
