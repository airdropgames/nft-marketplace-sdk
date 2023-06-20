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
    constructor(nftMarketplaceSdk, itemId, itemAmount, currencyId, currencyAmount, userWallet, startTimeUtc, endTimeUtc) {
        super(nftMarketplaceSdk, itemId, itemAmount, currencyId, currencyAmount, userWallet, startTimeUtc, endTimeUtc);
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
        if (!this.currencyData) {
            throw new Error('currencyData is not set');
        }
        return {
            makerAddress: this.userWallet,
            offeredAsset: {
                assetType: constants_1.ENUM_ASSET_TYPE[this.itemData.type],
                assetAddress: this.itemData.contractAddress,
                data: ethers_1.ethers.utils.solidityPack(['uint256', 'bytes'], [this.itemData.tokenId, additionalData]),
                value: this.itemData.amount,
            },
            askedAsset: {
                assetType: constants_1.ENUM_ASSET_TYPE.ERC20,
                assetAddress: this.currencyData.contractAddress,
                data: this.currencyData.transferData,
                value: this.currencyData.amount,
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
        if (!this.currencyData) {
            throw new Error('currencyData is not set');
        }
        return [
            this.userWallet,
            this.itemData.contractAddress,
            this.currencyData.contractAddress,
            this.startTimeUtc,
            this.endTimeUtc,
        ];
    }
}
exports.OfferOrder = OfferOrder;
