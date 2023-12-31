"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferOrder = void 0;
const ethers_1 = require("ethers");
const constants_1 = require("../../constants");
const Order_1 = require("./Order");
const date_1 = require("../../utils/date");
/**
 *
 *
 * @class OfferOrder
 * @augments {Order}
 */
class OfferOrder extends Order_1.Order {
    constructor(nftMarketplaceSdk, item, currency, userWallet, startTimeUtc, endTimeUtc) {
        super(nftMarketplaceSdk, item, currency, userWallet, startTimeUtc, endTimeUtc);
    }
    /**
     *
     * @inheritdoc Order.buildEip712Data
     */
    async buildEip712Data() {
        await this.fetchRequiredData();
        if (!this.itemData) {
            throw new Error('itemData is not set');
        }
        if (!this.cryptoCurrencyData) {
            throw new Error('cryptoCurrencyData is not set');
        }
        const values = {
            makerAddress: this.userWallet,
            offeredAsset: {
                assetType: constants_1.ENUM_ASSET_TYPE[this.itemData['protocolType']],
                assetAddress: this.itemData['contractAddress'],
                data: ethers_1.ethers.utils.solidityPack(['uint256', 'bytes'], [this.itemData['tokenId'], this.itemData.transferData || '0x']),
                value: this.itemData.value,
            },
            askedAsset: {
                assetType: constants_1.ENUM_ASSET_TYPE.ERC20,
                assetAddress: this.cryptoCurrencyData['contractAddress'],
                data: this.cryptoCurrencyData.transferData || '0x',
                value: this.cryptoCurrencyData.value,
            },
            start: this.startTimeUtc,
            end: this.endTimeUtc,
        };
        return {
            ...this.getEip712Constants(),
            values,
        };
    }
    /**
     *
     * @inheritdoc Order.arrayify
     */
    async arrayify() {
        const { values } = (await this.buildEip712Data());
        if (!this.itemData) {
            throw new Error('itemData is not set');
        }
        if (!this.cryptoCurrencyData) {
            throw new Error('cryptoCurrencyData is not set');
        }
        return [
            values.makerAddress,
            [
                values.offeredAsset.assetType,
                values.offeredAsset.assetAddress,
                values.offeredAsset.data,
                values.offeredAsset.value,
            ],
            [values.askedAsset.assetType, values.askedAsset.assetAddress, values.askedAsset.data, values.askedAsset.value],
            values.start,
            values.end,
        ];
    }
    async submit() {
        this.validateOrderBeforeSubmit();
        return this.nftMarketplaceSdk.apis.tenant.createOffer({
            userAddress: this.userWallet,
            item: this.itemData,
            currency: this.cryptoCurrencyData,
            startTimestamp: (0, date_1.getMysqlDateTimeString)(this.startTimeUtc),
            endTimestamp: (0, date_1.getMysqlDateTimeString)(this.endTimeUtc),
            networkSymbol: this.nftMarketplaceSdk.network,
            data: JSON.stringify({ data: await this.buildEip712Data() }),
            signature: this.signature,
        });
    }
    static fromTransaction(nftMarketplaceSdk, transaction) {
        const offerOrder = new OfferOrder(nftMarketplaceSdk, {
            protocolType: transaction?.item?.collection?.protocolType,
            contractAddress: transaction?.item?.collection?.contractAddress,
            tokenId: transaction?.item.tokenId,
            value: transaction?.itemValue,
        }, {
            contractAddress: transaction?.currency?.contractAddress,
            value: transaction?.currencyValue,
        }, transaction?.userId, (0, date_1.getUnixTimestampFromDateString)(transaction?.startTimestamp), (0, date_1.getUnixTimestampFromDateString)(transaction?.endTimestamp));
        offerOrder.setSignature(transaction.signature);
        return offerOrder;
    }
}
exports.OfferOrder = OfferOrder;
