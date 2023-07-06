import { CurrencyBidOfferParams, ItemBidOfferParams, Transaction } from "src/interfaces";
import NftMarketplaceSdk from "../../HyperSdk";
/**
 * @class Order
 * @description Base class for all order types
 *
 */
export declare abstract class Order {
    itemData: ItemBidOfferParams;
    cryptoCurrencyData: CurrencyBidOfferParams;
    userWallet: string;
    startTimeUtc: number;
    endTimeUtc: number;
    nftMarketplaceSdk: NftMarketplaceSdk;
    signature: string | null;
    eip712Domain: {
        name: string;
        version: string;
        chainId: string;
        verifyingContract: string;
    };
    eip712DataTypes: {
        PlatformData: {
            name: string;
            type: string;
        }[];
    };
    constructor(nftMarketplaceSdk: NftMarketplaceSdk, item: ItemBidOfferParams, currency: CurrencyBidOfferParams, userWallet: string, startTimeUtc: number, endTimeUtc: number);
    getEip712Constants(): {
        domain: {
            name: string;
            version: string;
            chainId: string;
            verifyingContract: string;
        };
        dataTypes: {
            PlatformData: {
                name: string;
                type: string;
            }[];
        };
    };
    validateOrderBeforeSubmit(): void;
    setSignature(signature: string): void;
    getSignature(): string;
    fetchRequiredData(): Promise<void>;
    /**
     * returns the arrified order data
     */
    abstract arrayify(): Promise<Array<string | number>>;
    /**
     * returns the order data in EIP712 required data format
     */
    abstract buildEip712Data(additionalData: string): Promise<Object>;
    abstract fromTransaction(nftMarketplaceSdk: NftMarketplaceSdk, transaction: Transaction): Order;
}
