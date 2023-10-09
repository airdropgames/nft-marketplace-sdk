import { TenantApis } from './apis/tenant';
import config from './config';
import { NETWORKS, NETWORK_CONFIG } from './constants';
import { HyprSDKOptions } from './interfaces';
import log from './utils/loglevel';

/**
 * @class NftMarketplaceSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
export default class NftMarketplaceSdk {
  public url: string;
  public key: string;
  public network: string;
  public chainId: string;
  public exchangeContractAddress: string;

  public apis: {
    tenant: TenantApis;
  } = {
    tenant: new TenantApis(this),
  };

  /**
   * HYPRPlaza SDK options
   */
  private options: HyprSDKOptions = {
    enableLogging: false,
  };

  /**
   *
   * @param {string} url HyperPlaza API url
   * @param {string} key HyperPlaza API key
   * @param {string} network HyperPlaza network
   */
  constructor(url: string, key: string, network: string, opts?: HyprSDKOptions) {
    const validatedUrl = this._validateUrl(url);

    this.url = validatedUrl;

    const validatedKey = this._validateKey(key);
    this.key = validatedKey;

    this.network = network || NETWORKS.MUMBAI;

    const networkConfig = NETWORK_CONFIG[this.network];
    if (!networkConfig) {
      throw new Error(`Network ${this.network} is not supported`);
    }
    this.chainId = networkConfig.chainId;
    this.exchangeContractAddress = networkConfig.marketplaceContractAddress;

    if (opts) {
      this.options = {
        ...this.options,
        ...opts,
      };
    }

    this._setLogLevel();
    this.apis = {
      ...this.apis,
      tenant: new TenantApis(this),
    };
  }

  public getUrl(): string {
    return this.url;
  }

  public getKey(): string {
    return this.key;
  }

  private _setLogLevel() {
    if (this.options.enableLogging) log.enableAll();
    else log.disableAll();
  }

  private _validateKey(key: string): string {
    if (config.enableApiKey && (!key || key === '')) {
      throw new Error('HyperPlaza API key is required');
    }
    return key;
  }

  private _validateUrl(url: string): string {
    if (!url || url === '') {
      throw new Error('HyperPlaza API url is required');
    }

    let _url = url;
    if (url.endsWith('/')) {
      _url = url.slice(0, -1);
    }
    return _url;
  }
}
