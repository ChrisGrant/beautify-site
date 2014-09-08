function angle() {}

angle.angleFromOffset = function(x, y) {
    if (x === 0 && y === 0) {
        return 0;
    }
    else if (x >= 0 && y >= 0) {
        return 90 + angle.degrees(Math.atan(y / x));
    }
    else if (x >= 0) {
        return angle.degrees(Math.atan(-x / y));
    }
    else if (y >= 0) {
        return 180 + angle.degrees(Math.atan(-x / y));
    }
    else {
        return 270 + angle.degrees(Math.atan(y / x));
    }
};

angle.distanceFromOffset = function(x, y) {
    return Math.round(Math.sqrt((x * x) + (y * y)));
};

angle.asOffset = function(angleDeg, distance) {
    var alpha, x, y;
    if (angleDeg >= 270) {
        alpha = angleDeg - 270;
        x = angle.round(-Math.cos(angle.radians(alpha)) * distance);
        y = angle.round(-Math.sin(angle.radians(alpha)) * distance);
    }
    else if (angleDeg >= 180) {
        alpha = angleDeg - 180;
        x = angle.round(-Math.sin(angle.radians(alpha)) * distance);
        y = angle.round(Math.cos(angle.radians(alpha)) * distance);
    }
    else if (angleDeg >= 90) {
        alpha = angleDeg - 90;
        x = angle.round(Math.cos(angle.radians(alpha)) * distance);
        y = angle.round(Math.sin(angle.radians(alpha)) * distance);
    }
    else {
        alpha = 90 - angleDeg;
        x = angle.round(Math.cos(angle.radians(alpha)) * distance);
        y = angle.round(-Math.sin(angle.radians(alpha)) * distance);
    }
    return { x: x, y: y };
};

angle.round = function(value) {
    return Number(value.toFixed(1));
};

angle.degrees = function(radians) {
    return (radians * 180) / Math.PI;
};

angle.radians = function(degrees) {
    return (degrees * Math.PI) / 180;
};

module.exports = angle;