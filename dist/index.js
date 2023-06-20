"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenant_1 = require("./apis/tenant");
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
        this.apis = {
            tenant: new tenant_1.TenantApis(this),
        };
        this.url = url;
        this.key = key;
        this.network = network;
    }
    log() {
        console.log('Hello world');
    }
}
exports.default = NftMarketplaceSdk;
