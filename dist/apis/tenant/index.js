"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantApis = void 0;
const base_api_services_1 = __importDefault(require("../../services/base.api.services"));
const endpoints_1 = __importDefault(require("../../config/endpoints"));
const loglevel_1 = __importDefault(require("../../utils/loglevel"));
class TenantApis extends base_api_services_1.default {
    constructor(hyperPlazaSdk) {
        super({
            baseUrl: hyperPlazaSdk.getUrl(),
            endpoints: endpoints_1.default
        });
        this.hyperPlazaSdk = hyperPlazaSdk;
    }
    async getNftItem(id) {
        try {
            const data = await this.get({
                endpoint: `${this.endpoints.getItems}/${id}`,
                header: this.headers.Header()
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || "Item not found");
            throw error?.response?.data || String(error);
        }
    }
    async getCryptoCurrencyByContractAddress(contractAddress) {
        try {
            const data = await this.get({
                endpoint: this.endpoints.currency,
                q: `contractAddress=${contractAddress}`
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || "Currency not found");
            throw error?.response?.data || String(error);
        }
    }
    async getCryptoCurrencyById(id) {
        try {
            const data = await this.get({
                endpoint: `${this.endpoints.currency}/${id}`,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || "Currency not found");
            throw error?.response?.data || String(error);
        }
    }
    createBid() { }
    createOffer() { }
    cancelTransaction() { }
    getCollections() { }
    async getCollectionById(id, includes) {
        try {
            const data = await this.get({
                endpoint: `${this.endpoints.collection}/${id}`,
                q: Array.isArray(includes) && includes.length > 0 ? `includes=${includes.join(',')}` : undefined
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || "Collection not found");
            throw error?.response?.data || String(error);
        }
    }
}
exports.TenantApis = TenantApis;
