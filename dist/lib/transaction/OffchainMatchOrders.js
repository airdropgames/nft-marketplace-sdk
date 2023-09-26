"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffchainMatchOrdersTransaction = void 0;
class OffchainMatchOrdersTransaction {
    /**
     * Creates an instance of OffchainMatchOrdersTransaction.
     * @param bidOrder bid order object
     * @param offerOrder offer order object
     * @param platformData platform data from the NFT Markplace platform
     * @param platformDataSignature signature of the platform data signed by the platform
     * @param txInitiatorId an ID of the transaction that initiates the order
     */
    constructor(bidOrder, offerOrder, platformData, txInitiatorId) {
        this.bidOrder = bidOrder;
        this.offerOrder = offerOrder;
        this.platformData = platformData;
        this.txInitiatorId = txInitiatorId;
    }
    async buildMatchOrderParams() {
        const { bidOrder, offerOrder, platformData: { royaltyReceiver, royaltyPermyriad, platformFeePermyriad, dataSignature, nonceChannel, nonce, signatureExpiryTimestamp, validatedOrder, }, txInitiatorId, } = this;
        const params = [
            await bidOrder.arrayify(),
            bidOrder.getSignature(),
            await offerOrder.arrayify(),
            offerOrder.getSignature(),
            [royaltyReceiver, royaltyPermyriad, platformFeePermyriad, signatureExpiryTimestamp, validatedOrder],
            [nonceChannel, nonce, dataSignature],
            txInitiatorId,
        ];
        return params;
    }
}
exports.OffchainMatchOrdersTransaction = OffchainMatchOrdersTransaction;
