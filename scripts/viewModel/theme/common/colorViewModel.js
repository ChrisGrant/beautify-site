var ko = require('knockout'),
    Color = require('../../../util/color'),
    NumberChanger = require('./numberChanger');

function ColorViewModel(color) {
    var ignoreUpdate = false;
    this.rawColor = ko.observable();
    this.opacity = ko.observable();
    this.latest = color || ko.observable("#00000000");
    var that = this;

    ko.computed(function() {
        var latest = this.latest();
        if (!ignoreUpdate) {
            this.rawColor(latest);
        }
    }.bind(this));

    this.parsedColor = ko.computed(function() {
        var raw = this.rawColor();
        if (raw) {
            try {
                var color = new Color(raw);

                if (color.validHex) {
                    ignoreUpdate = true;
                    this.latest(color.toString("hex"));
                    ignoreUpdate = false;
                }
                return color;
            } catch (e) {
                return raw;
            }
        }
        return raw;
    }.bind(this));

    this.exitColorInput = function() {
        if (this.parsedColor().nickname) {
            this.rawColor(this.parsedColor().nickname);
        }
    }.bind(this);

    this.displayColor = ko.computed(function() {
        var color = this.parsedColor();
        if (color) {
            if (color.rgba) { //use RGBA where we can as CSS doesn't recognise 8 digit hex codes
                return color.toString("rgba");
            } else {
                return color.toString();
            }
        }
    }.bind(this));

    this.parsedColor.subscribe(function() {
        var color = this.parsedColor();
        calcOpacity(color);
    }.bind(this));

    function calcOpacity(color) {
        if (color && color.rgba) {
            try {
                ignoreUpdate = true;
                that.opacity(decimalToPercent(parseFloat(color._rgba[3])));
                ignoreUpdate = false;
                return;
            } catch (e) {
                ignoreUpdate = true;
                that.opacity(100);
                ignoreUpdate = false;
                return;
            }
        }
        ignoreUpdate = true;
        that.opacity(100);
        ignoreUpdate = false;
    }

    calcOpacity(this.parsedColor());

    this.opacity.subscribe(function(newValue) {
        if (!ignoreUpdate && this.parsedColor().value) {
            var color = this.parsedColor();
            var elements;
            if (color.simple) {
                if (color.format !== "hex") {
                    color = new Color(color.toString("hex"));
                }
                var str = "rgba(" + color._hexToRGBA(color.value.substring(1)) + ")";
                elements = str.split(",");
            } else {
                elements = color.toString("rgba").split(", ");
            }
            var dec = percentageToDecimal(newValue);
            elements[elements.length - 1] = dec !== undefined ? dec : 1;
            this.rawColor(elements.join(", ") + ")");
        }
    }.bind(this));

    this.opacityChanger = new NumberChanger(this.opacity, 100, 0, [], new NumberChanger.Suffix("%"));

    this.changeFormat = function() {
        var color = this.parsedColor();
        var format = color.format;
        switch (color.format) {
            case "rgb":
                format = "hsl";
                break;

            case "shorthex":
                format = "hex";
                break;

            case "hex":
                if (color.simple) {
                    format = "rgb";
                } else {
                    format = "rgba";
                }
                break;

            case "nickname":
                if (color.simple) {
                    if (color.hasShortHex())
                        format = "shorthex";
                    else
                        format = "hex";
                    break;
                }

                format = "rgba";
                break;

            case "hsl":
                if (color.nickname)
                    format = "nickname";
                else if (color.hasShortHex())
                    format = "shorthex";
                else
                    format = "hex";
                break;

            case "rgba":
                format = "hsla";
                break;

            case "hsla":
                if (color.nickname)
                    format = "nickname";
                else
                    format = "hex";
                break;
        }
        this.rawColor(color.toString(format));
    }.bind(this);

    /* Adapted from webkit dev tools color control */
    this.keypressed = function (obj, event) {
        var prefix, number, suffix;
        var arrowKeyPressed = (event.keyIdentifier === "Up" || event.keyIdentifier === "Down");
        var pageKeyPressed = (event.keyIdentifier === "PageUp" || event.keyIdentifier === "PageDown");

        if (!arrowKeyPressed && !pageKeyPressed) {
            return true;
        }

        var selectIndex = event.target.selectionStart;

        //for RGB(A) and HSL(A)
        var parts = this.rawColor().split(",");
        var i = 0,
            j = 0;
        //find the part of the string that the cursor is currently at
        while (i < parts.length) {
            j += parts[i].length;
            if (j >= selectIndex) {
                break;
            }
            i++;
            j++; //add one for the comma
        }
        var wordString = parts[i];

        var matches = /(.*#)([\da-fA-F]+)(.*)/.exec(wordString);
        if (matches && matches.length) {
            //for hex values
            prefix = matches[1];
            var hexString = matches[2];
            suffix = matches[3];


            number = parseInt(hexString, 16);
            if (isNaN(number) || !isFinite(number)) {
                return hexString;
            }

            var maxValue = Math.pow(16, hexString.length) - 1;
            var delta;

            if (arrowKeyPressed) {
                delta = (event.keyIdentifier === "Up") ? 1 : -1;
            } else {
                delta = (event.keyIdentifier === "PageUp") ? 16 : -16;
            }

            if (event.shiftKey) {
                delta *= 16;
            }

            var result = number + delta;
            if (result < 0) {
                result = 0; // Color hex values are never negative, so clamp to 0.
            } else if (result > maxValue) {
                return hexString;
            }

            // Ensure the result length is the same as the original hex value.
            var resultString = result.toString(16).toUpperCase();
            for (i = 0, lengthDelta = hexString.length - resultString.length; i < lengthDelta; ++i) {
                resultString = "0" + resultString;
            }
            this.rawColor(prefix + resultString + suffix);
        } else {
            matches = /(.*?)(-?\d+(?:\.\d+)?)(.*)/.exec(wordString);
            if (matches && matches.length) {
                //handle rgb(a) & hsl(a)
                prefix = matches[1];
                number = parseFloat(matches[2]);
                suffix = matches[3];

                // Jump by 10 when shift is down or jump by 0.1 when near zero or Alt/Option is down.
                // Also jump by 10 for page up and down, or by 100 if shift is held with a page key.
                var changeAmount = 1;
                if (event.shiftKey && pageKeyPressed)
                    changeAmount = 100;
                else if (event.shiftKey || pageKeyPressed)
                    changeAmount = 10;
                else if (event.altKey)
                    changeAmount = 0.1;

                if (event.keyIdentifier === "Down" || event.keyIdentifier === "PageDown")
                    changeAmount *= -1;

                // Make the new number and constrain it to a precision of 6, this matches numbers the engine returns.
                // Use the Number constructor to forget the fixed precision, so 1.100000 will print as 1.1.
                number = Number((number + changeAmount).toFixed(6));


                parts[i] = prefix + number + suffix;
                //rebuild value - doing it this way rather than using .join() so we can position the selection
                var newValue = "",
                    beginIndex, endIndex;
                for (var k = 0; k < parts.length; k++) {
                    if (i === k) {
                        beginIndex = newValue.length + prefix.length;
                        endIndex = beginIndex + number.toString().length;
                    }
                    newValue += parts[k];
                    if (k !== parts.length - 1) {
                        newValue += ",";
                    }
                }

                this.rawColor(newValue);
                event.target.setSelectionRange(beginIndex, endIndex);
            } else {
                return true;
            }
        }
    } .bind(this);

    function decimalToPercent(decimal) {
        return decimal * 100;
    }

    function percentageToDecimal(perc) {
        return perc / 100;
    }

}

module.exports = ColorViewModel;
