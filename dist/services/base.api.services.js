"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const headers = __importStar(require("./headers.services"));
const axios_1 = __importDefault(require("axios"));
// this will be useful for api services
class BaseApi {
    constructor({ baseUrl, endpoints }) {
        this.post = async ({ data, header = this.headers.HeaderAuth(), endpoint, q = '', }) => {
            try {
                const res = await this.axios.post(`${this.baseUrl}${endpoint}${q ? `?${q}` : ``}`, data, header);
                return res.data;
            }
            catch (error) {
                throw error;
            }
        };
        this.get = async ({ q = '', header = this.headers.Header(), endpoint = '', params = {} }) => {
            try {
                const res = await this.axios.get(`${this.baseUrl}${endpoint}${q ? `?${q}` : ``}`, {
                    ...header,
                    params,
                });
                return res.data;
            }
            catch (error) {
                throw error;
            }
        };
        this.delete = async ({ header = this.headers.HeaderAuth(), endpoint = '' }) => {
            try {
                const res = await this.axios.delete(`${this.baseUrl}${endpoint}`, header);
                return res.data;
            }
            catch (error) {
                throw error;
            }
        };
        this.put = async ({ header = this.headers.HeaderAuth(), data = null, endpoint = '' }) => {
            try {
                const res = await this.axios.put(`${this.baseUrl}${endpoint}`, data, header);
                return res.data;
            }
            catch (error) {
                throw error;
            }
        };
        this.patch = async ({ header = this.headers.HeaderAuth(), data, endpoint = '', }) => {
            try {
                const res = await this.axios.patch(`${this.baseUrl}${endpoint}`, data, header);
                return res.data;
            }
            catch (error) {
                throw error;
            }
        };
        this.axios = axios_1.default;
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
        this.headers = headers;
    }
}
exports.default = BaseApi;
