/**
 * Created with JetBrains WebStorm.
 * User: ithake
 * Date: 27/09/13
 * Time: 12:09
 * To change this template use File | Settings | File Templates.
 */
/**
 * Convert stored iOS style contentMode into CSS backgroundSize.
 * Not to be saved to JSON
 * @type {*}
 */
var backgroundSizes = {
    "fill" : "100% 100%",
    "tile" : "",
    "aspectFill" : "cover"
};

function toBackgroundSize (contentMode) {
    return  backgroundSizes[contentMode];
}
module.exports = toBackgroundSize;