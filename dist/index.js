"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class NftMarketplaceSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
class NftMarketplaceSdk {
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
    log() {
        console.log('Hello world');
    }
}
exports.default = NftMarketplaceSdk;
