"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
/**
 * @class Order
 * @description Base class for all order types
 *
 */
class Order {
    constructor(nftMarketplaceSdk, itemId, itemAmount, currencyId, currencyAmount, userWallet, startTimeUtc, endTimeUtc) {
        this.itemId = '';
        this.itemAmount = '';
        this.currencyId = '';
        this.currencyAmount = '';
        this.userWallet = '';
        this.startTimeUtc = '';
        this.endTimeUtc = '';
        this.nftMarketplaceSdk = null;
        this.itemData = null;
        this.currencyData = null;
        this.signature = null;
        this.nftMarketplaceSdk = nftMarketplaceSdk;
        this.itemId = itemId;
        this.itemAmount = itemAmount;
        this.currencyId = currencyId;
        this.currencyAmount = currencyAmount;
        this.userWallet = userWallet;
        this.startTimeUtc = startTimeUtc;
        this.endTimeUtc = endTimeUtc;
    }
    setSignature(signature) {
        this.signature = signature;
    }
    getSignature() {
        if (this.signature == null) {
            throw new Error('Order signature is not set');
        }
        return this.signature;
    }
    async fetchRequiredData() {
        if (!this.nftMarketplaceSdk) {
            throw new Error('nftMarketplaceSdk is not set');
        }
        // get item & currency data from amount
        const dataPromises = [];
        dataPromises.push(this.itemData == null
            ? this.nftMarketplaceSdk.apis.tenant.getItem(this.itemId)
            : this.itemData);
        dataPromises.push(this.currencyData == null
            ? this.nftMarketplaceSdk.apis.tenant.getCryptoCurrency(this.currencyId)
            : this.currencyData);
        const [itemData, currencyData] = await Promise.all(dataPromises);
        this.itemData = itemData;
        this.currencyData = currencyData;
    }
}
exports.Order = Order;
