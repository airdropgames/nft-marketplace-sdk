"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidOrder = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const Order_1 = require("./Order");
/**
 *
 *
 * @class BidOrder
 * @augments {Order}
 */
class BidOrder extends Order_1.Order {
    constructor(nftMarketplaceSdk, itemId, itemAmount, cryptoCurrencyId, cryptoCurrencyAmount, userWallet, startTimeUtc, endTimeUtc, item, currency) {
        super(nftMarketplaceSdk, itemId, itemAmount, cryptoCurrencyId, cryptoCurrencyAmount, userWallet, startTimeUtc, endTimeUtc, item, currency);
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
                assetType: constants_1.ENUM_ASSET_TYPE.ERC20,
                assetAddress: this.cryptoCurrencyData.contractAddress,
                data: this.cryptoCurrencyData.transferData,
                value: this.cryptoCurrencyAmount,
            },
            askedAsset: {
                assetType: constants_1.ENUM_ASSET_TYPE[this.itemData.collection.protocolType],
                assetAddress: this.itemData.collection.contractAddress,
                data: ethers_1.ethers.utils.solidityPack(['uint256', 'bytes'], [this.itemData.tokenId, additionalData]),
                value: this.itemAmount,
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
            this.cryptoCurrencyData.contractAddress,
            this.itemData.collection.contractAddress,
            this.startTimeUtc,
            this.endTimeUtc,
        ];
    }
}
exports.BidOrder = BidOrder;
