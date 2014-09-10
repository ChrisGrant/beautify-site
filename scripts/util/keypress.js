/**
 * Constructor for utility to interrogate keypress events.
 * @returns
 */
function Keypress() {
	"use strict";
	
	var KEYCODE_ENTER = 13;
	var KEYCODE_ESCAPE = 27;
	
	var self = this;
	
	function keyCodeEquals(event, keyCode) {
        return (event.keyCode === keyCode);
	}
	
	/**
     * True if no special keys have been pressed.
     */
    this.isVanilla = function (event) {
        return (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey);
    };
    
	/**
	 * True if the keycode of the given event matches the paramer.
	 * Optional noSpecialCharacters excludes keypresses accompanied by special keys shift, ctrl, etc.
	 */
	this.isCode = function (event, keyCode, noSpecialCharacters) {
        var match = keyCodeEquals(event, keyCode);
        return noSpecialCharacters ? match && self.isVanilla(event) : match;
	};
	
	/**
	 * True if the event has a matching key code and none of the auxillary buttons are also pressed.
	 * @param event
	 * @returns
	 */
	this.isEnter = function (event) {
        return self.isCode(event, KEYCODE_ENTER, true);
	};
	
	this.isEscape = function (event) {
		return self.isCode(event, KEYCODE_ESCAPE, true);
	};
}
var keypress = new Keypress();

module.exports = keypress;