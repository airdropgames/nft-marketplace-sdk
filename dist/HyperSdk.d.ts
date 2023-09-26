import { TenantApis } from './apis/tenant';
import { HyprSDKOptions } from './interfaces';
/**
 * @class NftMarketplaceSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
export default class NftMarketplaceSdk {
    url: string;
    key: string;
    network: string;
    chainId: string;
    exchangeContractAddress: string;
    apis: {
        tenant: TenantApis;
    };
    /**
     * HYPRPlaza SDK options
     */
    private options;
    /**
     *
     * @param {string} url HyperPlaza API url
     * @param {string} key HyperPlaza API key
     * @param {string} network HyperPlaza network
     */
    constructor(url: string, key: string, network: string, opts?: HyprSDKOptions);
    getUrl(): string;
    getKey(): string;
    private _setLogLevel;
    private _validateKey;
    private _validateUrl;
}
