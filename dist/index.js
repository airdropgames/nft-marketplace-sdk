"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class HyperPlazaSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
class HyperPlazaSdk {
    /**
     *
     * @param {string} url HyperPlaza API url
     * @param {string} key HyperPlaza API key
     * @param {string} network HyperPlaza network
     */
    constructor(url, key, network) {
        this.url = '';
        this.key = '';
        this.network = '';
        this.apis = null;
        this.url = url;
        this.key = key;
        this.network = network;
        // this.apis = {
        //   tenant: new TenantApis(this),
        // };
    }
}
exports.default = HyperPlazaSdk;
