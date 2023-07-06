"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
/**
 * @class Order
 * @description Base class for all order types
 *
 */
class Order {
    constructor(nftMarketplaceSdk, item, currency, userWallet, startTimeUtc, endTimeUtc) {
        this.signature = null;
        this.eip712Domain = {
            name: 'NftMarketplace',
            version: '1.0.0',
            chainId: '',
            verifyingContract: '',
        };
        this.eip712DataTypes = {
            PlatformData: [
                { name: 'royaltyReceiver', type: 'address' },
                { name: 'royaltyPermyriad', type: 'uint256' },
                { name: 'feePermyriad', type: 'uint256' },
                { name: 'nonceChannel', type: 'uint8' },
                { name: 'nonce', type: 'uint256' },
                { name: 'txInitiatorId', type: 'string' },
            ],
        };
        this.nftMarketplaceSdk = nftMarketplaceSdk;
        this.userWallet = userWallet;
        this.startTimeUtc = startTimeUtc;
        this.endTimeUtc = endTimeUtc;
        this.eip712Domain.chainId = nftMarketplaceSdk.chainId;
        this.eip712Domain.verifyingContract = nftMarketplaceSdk.exchangeContractAddress;
        this.itemData = item;
        this.cryptoCurrencyData = currency;
    }
    getEip712Constants() {
        if (!this.eip712Domain.chainId || !this.eip712Domain.verifyingContract) {
            throw new Error('chainId or verifyingContract is not set');
        }
        return {
            domain: this.eip712Domain,
            dataTypes: this.eip712DataTypes
        };
    }
    validateOrderBeforeSubmit() {
        if (!this.signature) {
            throw new Error('Order signature is not set');
        }
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
        dataPromises.push(!("contractAddress" in this.itemData) || !("tokenId" in this.itemData) || !("network" in this.itemData)
            ? this.nftMarketplaceSdk.apis.tenant.getNftItemById(this.itemData["id"])
            : null);
        dataPromises.push(!("contractAddress" in this.cryptoCurrencyData) || !("network" in this.cryptoCurrencyData)
            ? this.nftMarketplaceSdk.apis.tenant.getCryptoCurrencyById(this.cryptoCurrencyData["id"])
            : null);
        const [fetchedItemData, fetchedCryptoCurrencyData] = await Promise.all(dataPromises);
        if (fetchedItemData != null) {
            this.itemData = {
                ...this.itemData,
                contractAddress: fetchedItemData?.collection?.contractAddress,
                tokenId: fetchedItemData?.tokenId,
            };
        }
        if (fetchedCryptoCurrencyData != null) {
            this.cryptoCurrencyData = {
                ...this.cryptoCurrencyData,
                contractAddress: fetchedCryptoCurrencyData?.contractAddress,
            };
        }
    }
}
exports.Order = Order;
