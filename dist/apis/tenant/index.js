"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantApis = void 0;
const axios_1 = __importDefault(require("axios"));
class TenantApis {
    constructor(hyperPlazaSdk) {
        this.hyperPlazaSdk = hyperPlazaSdk;
    }
    getNftItem(id) {
        return axios_1.default.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/items/${id}`).then((res) => res.data);
    }
    getCryptoCurrencyByContractAddress(contractAddress) {
        return axios_1.default.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/currencies?contractAddress=${contractAddress}`).then((res) => res.data);
    }
    getCryptoCurrencyById(id) {
        return axios_1.default.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/currencies/${id}`).then((res) => res.data);
    }
    createBid() { }
    createOffer() { }
    cancelTransaction() { }
    getCollections() { }
    getCollectionById(id, includes) {
        return axios_1.default.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/collections/${id}?includes=${includes.join(',')}`).then((res) => res.data);
    }
}
exports.TenantApis = TenantApis;
