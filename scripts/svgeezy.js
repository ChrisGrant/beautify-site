/**
 * Based on SVGeezy.js 1.0 by Ben Howdle
 * https://github.com/benhowdle89/svgeezy/
 *
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 */
(function(window) {
    "use strict";

    var svgeezy = {

        init: function(avoid, filetype) {
            this.avoid = avoid || false;
            this.filetype = filetype || "png";
            this.svgSupport = this.supportsSvg();
            if (!this.svgSupport) {
                this.images = document.getElementsByTagName("img");
                this.imgL = this.images.length;
                this.fallbacks();
            }
        },

        fallbacks: function() {
            while (this.imgL--) {
                if (!this.avoid || !this.hasClass(this.images[this.imgL], this.avoid)) {
                    var src = this.images[this.imgL].getAttribute("src");
                    if (src === null) {
                        continue;
                    }
                    if (this.getFileExt(src) == "svg") {
                        var newSrc = src.replace(".svg", "." + this.filetype);
                        this.images[this.imgL].setAttribute("src", newSrc);
                    }
                }
            }
        },

        getFileExt: function(src) {
            var ext = src.split(".").pop();
            if (ext.indexOf("?") !== -1) {
                ext = ext.split("?")[0];
            }
            return ext;
        },

        hasClass: function(element, cls) {
            return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
        },

        supportsSvg: function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
        }
    };

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(svgeezy);
    }
    else {
        // browser global
        window.svgeezy = svgeezy;
    }

})(window);

(function() {
    svgeezy.init();
})