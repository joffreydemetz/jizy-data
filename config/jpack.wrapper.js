/*! jData v@VERSION | @DATE | [@BUNDLE] */
(function (global) {
    "use strict";

    if (typeof global !== "object" || !global) {
        throw new Error("jData requires a window");
    }

    if (typeof global.jData !== "undefined") {
        throw new Error("jData is already defined");
    }

    // @CODE 

    global.jData = jData;

})(typeof window !== "undefined" ? window : this);