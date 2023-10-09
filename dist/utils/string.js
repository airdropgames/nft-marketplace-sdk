"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalizeUrls = void 0;
/**
 * get generalize url
 * @param {string} url
 * @returns {string | null} generalized url
 */
const generalizeUrls = (url) => {
    if (!url || url === '') {
        return null;
    }
    let _url = url;
    if (url.endsWith('/')) {
        _url = url.slice(0, -1);
    }
    return _url;
};
exports.generalizeUrls = generalizeUrls;
