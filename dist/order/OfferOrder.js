"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferOrder = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../constants");
const Order_1 = require("./Order");
/**
 *
 *
 * @class OfferOrder
 * @augments {Order}
 */
class OfferOrder extends Order_1.Order {
    constructor(nftMarketplaceSdk, itemId, itemAmount, cryptoCurrencyId, cryptoCurrencyAmount, userWallet, startTimeUtc, endTimeUtc) {
        super(nftMarketplaceSdk, itemId, itemAmount, cryptoCurrencyId, cryptoCurrencyAmount, userWallet, startTimeUtc, endTimeUtc);
    }
    /**
     *
     * @inheritdoc Order.buildEip712Data
     */
    async buildEip712Data(additionalData) {
        await this.fetchRequiredData();
        if (!this.itemData) {
            throw new Error('itemData is not set');
        }
        if (!this.cryptoCurrencyData) {
            throw new Error('cryptoCurrencyData is not set');
        }
        if (!this.itemData.collection) {
            throw new Error('itemData.collection is not set');
        }
        return {
            makerAddress: this.userWallet,
            offeredAsset: {
                assetType: constants_1.ENUM_ASSET_TYPE[this.itemData.collection.protocolType],
                assetAddress: this.itemData.collection.contractAddress,
                data: ethers_1.ethers.utils.solidityPack(['uint256', 'bytes'], [this.itemData.tokenId, additionalData]),
                value: this.itemAmount,
            },
            askedAsset: {
                assetType: constants_1.ENUM_ASSET_TYPE.ERC20,
                assetAddress: this.cryptoCurrencyData.contractAddress,
                data: this.cryptoCurrencyData.transferData,
                value: this.cryptoCurrencyAmount,
            },
            start: this.startTimeUtc,
            end: this.endTimeUtc,
        };
    }
    /**
     *
     * @inheritdoc Order.arrayify
     */
    async arrayify() {
        await this.fetchRequiredData();
        if (!this.itemData) {
            throw new Error('itemData is not set');
        }
        if (!this.cryptoCurrencyData) {
            throw new Error('cryptoCurrencyData is not set');
        }
        if (!this.itemData.collection) {
            throw new Error('itemData.collection is not set');
        }
        return [
            this.userWallet,
            this.itemData.collection.contractAddress,
            this.cryptoCurrencyData.contractAddress,
            this.startTimeUtc,
            this.endTimeUtc,
        ];
    }
}
exports.OfferOrder = OfferOrder;
