"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
/**
 * @class Order
 * @description Base class for all order types
 *
 */
class Order {
    constructor(nftMarketplaceSdk, itemId, itemAmount, cryptoCurrencyId, cryptoCurrencyAmount, userWallet, startTimeUtc, endTimeUtc) {
        this.itemId = '';
        this.itemAmount = '';
        this.cryptoCurrencyId = '';
        this.cryptoCurrencyAmount = '';
        this.userWallet = '';
        this.startTimeUtc = '';
        this.endTimeUtc = '';
        this.nftMarketplaceSdk = null;
        this.itemData = null;
        this.cryptoCurrencyData = null;
        this.signature = null;
        this.nftMarketplaceSdk = nftMarketplaceSdk;
        this.itemId = itemId;
        this.itemAmount = itemAmount;
        this.cryptoCurrencyId = cryptoCurrencyId;
        this.cryptoCurrencyAmount = cryptoCurrencyAmount;
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
            ? this.nftMarketplaceSdk.apis.tenant.getNftItem(this.itemId)
            : this.itemData);
        dataPromises.push(this.cryptoCurrencyData == null
            ? this.nftMarketplaceSdk.apis.tenant.getCryptoCurrency(this.cryptoCurrencyId)
            : this.cryptoCurrencyData);
        const [itemData, cryptoCurrencyData] = await Promise.all(dataPromises);
        this.itemData = itemData;
        this.cryptoCurrencyData = cryptoCurrencyData;
    }
}
exports.Order = Order;
