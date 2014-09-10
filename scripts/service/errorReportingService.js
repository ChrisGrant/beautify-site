
// represents an error that we would like the user to send to us!
function UserError(errorMessage) {
    this.errorMessage = errorMessage;

    // taken from here: http://www.codeovertones.com/2011/08/how-to-print-stack-trace-anywhere-in.html
    var e = new Error('dummy');
    this.strackTrace = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
          .replace(/^\s+at\s+/gm, '')
          .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@');
}

function broadcastError(error, errorListener) {
    // output to the console to aid debugging
    console.error(error);

    // create a user error
    var userError = new UserError(error);

    // send to the listener
    if (errorListener) {
        errorListener(userError);
    }
}

/**
 * a very simple reporting service, whenever an error is reported, it is passed to the
 * listener
 */
function ErrorReportingService() {
    this.errorListener = undefined;
}

ErrorReportingService.prototype.reportError = function (error) {
    // Errors returned from parse/backend can have properties message & code.
    // See https://www.parse.com/docs/js/symbols/Parse.Error.html
    broadcastError(error.message ? error.message : error, this.errorListener);
};

var reportingService = new ErrorReportingService();

module.exports = reportingService;
