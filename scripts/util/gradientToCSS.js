var ko = require('knockout'),
    colorToCSS = require('./colorToCSS');

function positionSort(stopA, stopB) {
    return (stopA.position() - stopB.position());
}

function gradientToCSS(gradient, horizontal, ignoreRadial) {

    if (gradient.stops().length < 2) {
        return "";
    }

    var style = [];

    if (!ignoreRadial && gradient.radial()) {
        style.push("-webkit-radial-gradient(");
    } else {
        style.push("-webkit-linear-gradient(");
        if(horizontal) {
            style.push("left, ");
        }
    }

    var i, stop, last;
    var stops = ko.observableArray(gradient.stops());
    stops().sort(positionSort);
    for (i = 0, last = stops().length - 1; i < stops().length; i++) {
        stop = stops()[i];
        style.push(colorToCSS(stop.color()));
        style.push(" ");
        style.push(Math.round(stop.position() * 100));
        style.push("%");
        if (i != last) {
            style.push(",");
        }
    }
    style.push(")");
    return style.join("");
}


module.exports = gradientToCSS;