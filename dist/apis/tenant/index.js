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
            const query = qs_1.default.stringify({ includes });
            const data = await this.get({
                endpoint: `${this.endpoints.collection}/${id}?${query}`,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Collection not found');
            throw error?.response?.data || String(error);
        }
    }
    async getCollectionByContractAddress(network, contractAddress, { includes = [] }) {
        try {
            const query = qs_1.default.stringify({ filter: { collectionContracts: [{ network, contractAddress }] }, limit: 1, includes });
            const data = await this.get({
                endpoint: `${this.endpoints.collection}?${query}`,
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
            const query = qs_1.default.stringify({ filter: { collectionContracts: [{ network, contractAddress, tokenId }] }, limit: 1, includes });
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
            const query = qs_1.default.stringify({ filter: { contractAddress }, limit: 1 });
            const data = await this.get({
                endpoint: `${this.endpoints.currency}?${query}`,
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
    async createTransaction(params) {
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
        return this.createTransaction({ ...params, type: 'BID' });
    }
    async createOffer(params) {
        return this.createTransaction({ ...params, type: 'OFFER' });
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
    async registerCollection(collectionData) {
        try {
            const data = await this.post({
                endpoint: `${this.endpoints.collection}`,
                data: collectionData,
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'registerCollections failed');
            throw error?.response?.data || String(error);
        }
    }
}
exports.TenantApis = TenantApis;
