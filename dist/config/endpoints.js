"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hyprEndpoints = {
    getItems: (id) => `/api/v1/tenant/items/${id}`,
    currency: `/api/v1/tenant/currencies`,
    collection: `/api/v1/tenant/collections`
};
exports.default = hyprEndpoints;
