/**
 * angleViewModel
 * Relates a offset model's x & y coordinates to a displayable angle and distance.
 * Extracted from textShadowViewModel
 * Could separate into offsetAngleViewModel & offsetDistanceViewModel
 */
var ko = require('knockout'),
    calculate = require('../../../util/angle'),
    NumberChanger = require('./numberChanger');
 
function OffsetViewModel(offsetModel) {
    var self = this; // will be used by children as well.
    
    function applyOffset(offset) {
        offsetModel.x(offset.x);
        offsetModel.y(offset.y);
    }

    /* I've chosen to round the calculated angle as clicking on the circle
     * and having an displayed angle with 6 decimal places seemed overly detailed.
     * This means that we can get rounded mismatches as the values get converted from degrees to x & y.
     + user clicks circle - e.g 204.31
     + value is rounded and passed into angle.write e.g. 204
     + offset.x is updated 
     + angle.read re-computes as decimal
     + angle.read rounds to 203.
     * This can result in a user typing 199 deg, but being updated to 200 deg.
     * As long as this is consistent, it's a feature not a bug! 
     * However if we get negative feedback, it's easy to remove the call Math.round below. 
     */
    function AngleViewModel() { 
        this.value = ko.computed({
            read: function() { 
                // Calculation doesn't round angle.
                var angle = calculate.angleFromOffset(offsetModel.x(), offsetModel.y()); 
                return Math.round(angle); // this rounding matches circularAnglePicker.
            },
            write : function updateOffsetFromAngle (angle) {
                console.log("Angle changed to", angle);
                applyOffset(calculate.asOffset(angle, self.distance.value()));
            },
            owner : this
        }).extend({ throttle: 1 }); // delay reading so that both x & y can change
         
        this.changer = new NumberChanger(this.value, 359, 0, [0, 45, 90, 135, 180, 225, 270, 315], new NumberChanger.Suffix(" deg"));
    }  
    
    function DistanceViewModel() {
        this.value = ko.computed({
            read: function() { 
                // Calculation rounds distance.
                return calculate.distanceFromOffset(offsetModel.x(), offsetModel.y()); 
            },
            write: function updateOffsetFromDistance(distance) {
                console.log("Distance changed to:", distance);
                applyOffset(calculate.asOffset(self.angle.value(), distance));
            },
            owner : this
        }).extend({ throttle: 1 }); // delay reading so that both x & y can change
        
        this.changer = new NumberChanger(this.value, 20, 0, [], new NumberChanger.Suffix("pt"));
    }
    
    this.x = offsetModel.x;
    this.y = offsetModel.y;
    
    this.angle = new AngleViewModel();
    this.distance = new DistanceViewModel();
}

module.exports = OffsetViewModel;