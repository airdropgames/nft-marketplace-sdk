import { TenantApis } from "./apis/tenant";
/**
 * @class NftMarketplaceSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
export default class NftMarketplaceSdk {
    url: string;
    key: string;
    network: string;
    apis: {
        tenant: TenantApis;
    };
    /**
     *
     * @param {string} url HyperPlaza API url
     * @param {string} key HyperPlaza API key
     * @param {string} network HyperPlaza network
     */
    constructor(url: string, key: string, network: string);
    log(): void;
}
