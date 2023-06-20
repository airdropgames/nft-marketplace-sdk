import NftMarketplaceSdk from "..";
/**
 * @class Order
 * @description Base class for all order types
 *
 */
export declare abstract class Order {
    itemId: string;
    itemAmount: string;
    currencyId: string;
    currencyAmount: string;
    userWallet: string;
    startTimeUtc: string;
    endTimeUtc: string;
    nftMarketplaceSdk: NftMarketplaceSdk | null;
    itemData: Item | null;
    currencyData: CryptoCurrency | null;
    signature: string | null;
    constructor(nftMarketplaceSdk: NftMarketplaceSdk, itemId: string, itemAmount: string, currencyId: string, currencyAmount: string, userWallet: string, startTimeUtc: string, endTimeUtc: string);
    setSignature(signature: string): void;
    getSignature(): string;
    fetchRequiredData(): Promise<void>;
    /**
     * returns the arrified order data
     */
    abstract arrayify(): Promise<Array<string>>;
    /**
     * returns the order data in EIP712 required data format
     */
    abstract buildEip712Data(additionalData: string): Promise<Object>;
}
