var ko = require('knockout');

// the knockout throttle will not fire until there have not been any changes within the throttle-time. The
// following throttle implementation is a bit more flexible, allowing changes to be fired while
// the adapted observable is still changing.
if (!ko.subscribable.fn.throttle) {
    ko.subscribable.fn.throttle = function(throttleTime, fireWhileChanging) {
        var subscribable = this;
        var throttledObservable = ko.observable();
        var timeoutHandle = null;
        var newValue = null;

        subscribable.subscribe(function(val) {
            if (fireWhileChanging) {
                // capture the updated value
                newValue = val;
                // if a timer is not running, start a new one
                if (!timeoutHandle) {
                    timeoutHandle = setTimeout(function() {
                        throttledObservable(newValue);
                        timeoutHandle = null;
                    }, throttleTime);
                }
            } else {
                // if a timer is running, restart it
                clearTimeout(timeoutHandle);
                timeoutHandle = setTimeout(function() {
                    throttledObservable(val);
                    timeoutHandle = null;
                }, throttleTime);
            }
        });

        return throttledObservable;
    };
}