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
        this.tenantKey = "";
        this.hyperPlazaSdk = hyperPlazaSdk;
        this.tenantKey = this.hyperPlazaSdk.getKey();
    }
    async listCollections({ filter, page, limit, sort, includes = [], search, }) {
        try {
            const query = qs_1.default.stringify({
                filter,
                page,
                limit,
                sort,
                includes,
                search,
            });
            const data = await this.get({
                endpoint: `${this.endpoints.collection}?${query}`,
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
            });
            return data?.data?.length > 0 ? data?.data[0] : null;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Collection not found');
            throw error?.response?.data || String(error);
        }
    }
    async listNftItems({ filter, page, limit, sort, includes = [], context }) {
        try {
            const query = qs_1.default.stringify({
                filter,
                page,
                limit,
                sort,
                includes,
                context
            });
            const data = await this.get({
                endpoint: `${this.endpoints.item}?${query}`,
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Item not found');
            throw error?.response?.data || String(error);
        }
    }
    async getNftItemByTokenId(network, contractAddress, tokenId, { includes, context } = {}) {
        try {
            const query = qs_1.default.stringify({ filter: { collectionContracts: [{ network, contractAddress, tokenId }] }, limit: 1, includes, context });
            const data = await this.get({
                endpoint: `${this.endpoints.item}?${query}`,
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
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
                header: this.headers.HeaderAuth(this.tenantKey),
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'Transaction not found');
            throw error?.response?.data || String(error);
        }
    }
    async getTransactionPlatformData(transactionId, senderAddress) {
        try {
            if (!senderAddress) {
                throw new Error('Sender address is required');
            }
            const query = qs_1.default.stringify({ senderAddress });
            const data = await this.get({
                endpoint: `${this.endpoints.transactionPlatformData}/${transactionId}?${query}`,
                header: this.headers.HeaderAuth(this.tenantKey),
            });
            return data;
        }
        catch (error) {
            console.log(error, "@error?");
            loglevel_1.default.error(error.message || 'Transaction not found');
            throw error?.response?.data || String(error);
        }
    }
    async registerCollection(collectionData) {
        try {
            const data = await this.post({
                endpoint: `${this.endpoints.collection}`,
                data: collectionData,
                header: this.headers.HeaderAuth(this.tenantKey),
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'registerCollections failed');
            throw error?.response?.data || String(error);
        }
    }
    async updateCollection(id, collectionData) {
        try {
            const data = await this.patch({
                endpoint: `${this.endpoints.collection}/${id}`,
                data: collectionData,
                header: this.headers.HeaderAuth(this.tenantKey),
            });
            return data;
        }
        catch (error) {
            loglevel_1.default.error(error.message || 'updateCollection failed');
            throw error?.response?.data || String(error);
        }
    }
}
exports.TenantApis = TenantApis;
