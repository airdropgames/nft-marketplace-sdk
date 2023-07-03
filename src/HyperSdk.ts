import { TenantApis } from "./apis/tenant";
import config from "./config";
import { NETWORKS } from "./constants";
import { HyprSDKOptions, HyprTenantApis } from "./interfaces";
import log from './utils/loglevel'

/**
 * @class NftMarketplaceSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
export default class NftMarketplaceSdk {
    public url: string;

    public key: string;

    public network: string;

    public apis: {
      tenant: TenantApis
    } = {
      tenant: new TenantApis(this),
    };

    /**
     * HYPRPlaza SDK options
     */
    private options: HyprSDKOptions = {
      enableLogging: false
    };

    /**
     *
     * @param {string} url HyperPlaza API url
     * @param {string} key HyperPlaza API key
     * @param {string} network HyperPlaza network
     */
    constructor(url: string, key: string, network: string, opts?: HyprSDKOptions) {
      const validatedUrl = this._validateUrl(url)

      this.url = validatedUrl;

      const validatedKey = this._validateKey(key)
      this.key = validatedKey;
    
      this.network = network || NETWORKS.MUMBAI;
      if (opts) {
        this.options = {
          ...this.options,
          ...opts
        }
      }

      this._setLogLevel()
      this.apis = {
        ...this.apis,
        tenant: new TenantApis(this)
      }
    }

    public getUrl(): string {
      return this.url;
    }

    private _setLogLevel() {
      if (this.options.enableLogging) log.enableAll()
      else log.disableAll()
    }

    private _validateKey(key: string): string {
      if (config.enableApiKey && (!key || key === '')) {
        throw new Error('HyperPlaza API key is required')
      }
      return key
    }

    private _validateUrl(url: string): string {
      if (!url || url === '') {
        throw new Error('HyperPlaza API url is required')
      }

      let _url = url;
      if (url.endsWith('/')) {
        _url = url.slice(0, -1);
      }
      return _url
    }
}