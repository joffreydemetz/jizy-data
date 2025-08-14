/*! Data v@VERSION | @DATE | [@BUNDLE] */
(function (global) {
    "use strict";

    if (typeof global !== "object" || !global || !global.document) {
        throw new Error("Data requires a window with a document");
    }

    if (typeof global.jData !== "undefined") {
        throw new Error("jData is already defined");
    }

    // @CODE 

    global.jData = jData;

})(typeof window !== "undefined" ? window : this);