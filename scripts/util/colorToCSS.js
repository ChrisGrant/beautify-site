var ko = require('knockout'),
    Color = require('./color');


// CSS colors only support alpha when expressed as RGBA. Here we ensure that RGBA format is used
// when an alpha value is present 
function colorToCSS(color) {
    if (color) {
        var newColor = new Color(color);
        if (newColor.rgba) { 
            return newColor.toString("rgba");
        } else {
            return newColor.toString("rgb");
        }
    }
    return "";
}


module.exports = colorToCSS;