var ko = require('knockout');

/** 
 * The commonest decorator is to append a suffix.
 * @param suffix
 * @returns {Function}
 */
function SuffixDecorator(suffix) {
    this.apply = function (value) {
            return value + suffix;
    };
    
    this.undo = function (value) {
        var pos = value.lastIndexOf(suffix);
        return (pos > -1) ? value.slice(0, pos) : value;
    };
}
    
var emptyDecorator = {
    apply : function (undecorated) {
        return undecorated;
    },
    
    undo : function (decorated) {
        return decorated;
    }
};

/**
 * Ideally the decorator is an optional method
 * @param changable
 * @param max
 * @param min
 * @param options
 * @param decorator - object with apply & undo functions on it.
 * @returns
 */
function NumberChanger(changable, max, min, options, decorator) {
    var self = this;
    var ignoreUpdate = false;

    max = max !== undefined ? max : Number.MAX_VALUE;
    min = min !== undefined ? min : Number.MIN_VALUE;
    this.hasOptions = options !== undefined && options.length > 0;

    decorator = decorator || emptyDecorator;
    
    if (this.hasOptions) {
        this.options = $.map(options, function(v, i) {
            return decorator.apply(v);
        });

        this.dropdownValue = ko.observable(this.options[0]);

        this.dropdownValue.subscribe(function(newValue) {
            self.display(newValue); // don't transform as the options are already decorated
        });
    }
    
    this.display = ko.observable(changable() !== undefined ? decorator.apply(changable()) : min);

    /* When the displayed value is changed, apply the underlying value the changeable.
     * 
     */
    this.display.subscribe(function onDisplayChanged(newValue) {
        if (!ignoreUpdate) {
            var raw = decorator.undo(newValue);
            var val = parseFloat(raw);
            if (!isNaN(val)) {
                if (val > max) {
                    changable(max);
                    self.display(decorator.apply(max));
                } else if (val < min) {
                    changable(min);
                    self.display(decorator.apply(min));
                } else {
                    changable(val);
                    self.display(decorator.apply(val));
                }
            }
        }
    });

    changable.subscribe(function onChangeableChanged(newValue) {
        ignoreUpdate = true;
        self.display(decorator.apply(newValue));
        ignoreUpdate = false;
    });

    this.keydown = function(vm, event) {
        var upPressed = event.keyIdentifier === "Up";
        var downPressed = event.keyIdentifier === "Down";

        if (upPressed || downPressed) {
            var step = 1;
            if (downPressed) {
                step *= -1;
            }
            
            var currentValue = $(event.target).val();
            var asNumeric = parseFloat(decorator.undo(currentValue));
            if (!isNaN(asNumeric)) {
                var updated = asNumeric + step;
                self.display(decorator.apply(updated));
                return false;
            }
        }
        return true;
    };
}

module.exports = NumberChanger;
module.exports.Suffix = SuffixDecorator;
