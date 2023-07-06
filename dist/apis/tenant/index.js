"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantApis = void 0;
const qs_1 = __importDefault(require("qs"));
const base_api_services_1 = __importDefault(require("../../services/base.api.services"));
const endpoints_1 = __importDefault(require("../../config/endpoints"));
const loglevel_1 = __importDefault(require("../../utils/loglevel"));
class TenantApis extends base_api_services_1.default {
    constructor(hyperPlazaSdk) {
        super({
            baseUrl: hyperPlazaSdk.getUrl(),
            endpoints: endpoints_1.default,
        });
        this.hyperPlazaSdk = hyperPlazaSdk;
    }
    async listCollections({ filter, page, limit, sort, includes = [], }) {
        try {
            const query = qs_1.default.stringify({
                filter,
                page,
                limit,
                sort,
                includes,
            });
            const data = await this.get({
                endpoint: `${this.endpoints.collection}?${query}`,
                header: this.headers.Header(),
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Collection not found');
            throw error?.response?.data || String(error);
        }
    }
    async getCollectionById(id, includes) {
        try {
            const data = await this.get({
                endpoint: `${this.endpoints.collection}/${id}`,
                q: Array.isArray(includes) && includes.length > 0 ? `includes=${includes.join(',')}` : undefined,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Collection not found');
            throw error?.response?.data || String(error);
        }
    }
    async getCollectionByContractAddress(network, contractAddress, includes) {
        try {
            const query = qs_1.default.stringify({ filter: { network, contractAddress }, includes });
            const data = await this.get({
                endpoint: `${this.endpoints.collection}?${query}`,
                q: Array.isArray(includes) && includes.length > 0 ? `includes=${includes.join(',')}` : undefined,
            });
            return data?.data?.length > 0 ? data?.data[0] : null;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Collection not found');
            throw error?.response?.data || String(error);
        }
    }
    async listNftItems({ filter, page, limit, sort, includes = [] }) {
        try {
            const query = qs_1.default.stringify({
                filter,
                page,
                limit,
                sort,
                includes,
            });
            const data = await this.get({
                endpoint: `${this.endpoints.item}?${query}`,
                header: this.headers.Header(),
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Items not found');
            throw error?.response?.data || String(error);
        }
    }
    async getNftItemById(id) {
        try {
            const data = await this.get({
                endpoint: `${this.endpoints.item}/${id}`,
                header: this.headers.Header(),
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Item not found');
            throw error?.response?.data || String(error);
        }
    }
    async getNftItemByTokenId(network, contractAddress, tokenId, { includes } = {}) {
        try {
            const query = qs_1.default.stringify({ filter: { network, contractAddress, tokenId }, includes });
            const data = await this.get({
                endpoint: `${this.endpoints.item}?${query}`,
                header: this.headers.Header(),
            });
            return data?.data?.length > 0 ? data?.data[0] : null;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Item not found');
            throw error?.response?.data || String(error);
        }
    }
    async getCryptoCurrencyByContractAddress(contractAddress) {
        try {
            const data = await this.get({
                endpoint: this.endpoints.currency,
                q: `contractAddress=${contractAddress}`,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Currency not found');
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
            loglevel_1.default.error(error.message || 'Currency not found');
            throw error?.response?.data || String(error);
        }
    }
    async listTransactions({ filter, page, limit, sort, includes = [], }) {
        try {
            const query = qs_1.default.stringify({ filter, page, limit, sort, includes });
            const data = await this.get({
                endpoint: `${this.endpoints.transaction}?${query}`,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Transaction not found');
            throw error?.response?.data || String(error);
        }
    }
    async getTransactionById(id, includes) {
        try {
            const query = qs_1.default.stringify({ includes });
            const data = await this.get({
                endpoint: `${this.endpoints.transaction}/${id}?${query}`,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Transaction not found');
            throw error?.response?.data || String(error);
        }
    }
    async createTranscaction(params) {
        try {
            const data = await this.post({
                endpoint: `${this.endpoints.transaction}`,
                data: params,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Transaction not found');
            throw error?.response?.data || String(error);
        }
    }
    async createBid(params) {
        return this.createTranscaction({ ...params, type: 'BID' });
    }
    async createOffer(params) {
        return this.createTranscaction({ ...params, type: 'OFFER' });
    }
    async cancelTransaction(id) {
        try {
            const data = await this.delete({
                endpoint: `${this.endpoints.transaction}/${id}`,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Transaction not found');
            throw error?.response?.data || String(error);
        }
    }
    async getTransactionPlatformData(transactionId) {
        try {
            const data = await this.get({
                endpoint: `${this.endpoints.transactionPlatformData}/${transactionId}`,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Transaction not found');
            throw error?.response?.data || String(error);
        }
    }
}
exports.TenantApis = TenantApis;
