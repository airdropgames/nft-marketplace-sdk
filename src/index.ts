import { TenantApis } from "./apis/tenant";

/**
 * @class NftMarketplaceSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
export default class NftMarketplaceSdk {
    url = '';
    key = '';
    network = '';
    apis = {
        tenant: new TenantApis(this),
    };

    /**
     *
     * @param {string} url HyperPlaza API url
     * @param {string} key HyperPlaza API key
     * @param {string} network HyperPlaza network
     */
    constructor(url: string, key: string, network: string) {
        this.url = url;
        this.key = key;
        this.network = network;
    }

    log() {
        console.log('Hello world');
    }
}


