"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tenant_1 = require("./apis/tenant");
const config_1 = __importDefault(require("./config"));
const constants_1 = require("./constants");
const loglevel_1 = __importDefault(require("./utils/loglevel"));
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
    constructor(url, key, network, opts) {
        this.apis = {
            tenant: new tenant_1.TenantApis(this),
        };
        /**
         * HYPRPlaza SDK options
         */
        this.options = {
            enableLogging: false
        };
        const validatedUrl = this._validateUrl(url);
        this.url = validatedUrl;
        const validatedKey = this._validateKey(key);
        this.key = validatedKey;
        this.network = network || constants_1.NETWORKS.MUMBAI;
        if (opts) {
            this.options = {
                ...this.options,
                ...opts
            };
        }
        this._setLogLevel();
        this.apis = {
            ...this.apis,
            tenant: new tenant_1.TenantApis(this)
        };
    }
    getUrl() {
        return this.url;
    }
    _setLogLevel() {
        if (this.options.enableLogging)
            loglevel_1.default.enableAll();
        else
            loglevel_1.default.disableAll();
    }
    _validateKey(key) {
        if (config_1.default.enableApiKey && (!key || key === '')) {
            throw new Error('HyperPlaza API key is required');
        }
        return key;
    }
    _validateUrl(url) {
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
exports.default = NftMarketplaceSdk;
