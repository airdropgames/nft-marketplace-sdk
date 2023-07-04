import { CryptoCurrency, NftItem, OrderCurrency, OrderItem } from "src/interfaces";
import NftMarketplaceSdk from "../../HyperSdk";
/**
 * @class Order
 * @description Base class for all order types
 *
 */
export declare abstract class Order {
    itemId: string;
    itemAmount: string;
    cryptoCurrencyId: string;
    cryptoCurrencyAmount: string;
    userWallet: string;
    startTimeUtc: string;
    endTimeUtc: string;
    nftMarketplaceSdk: NftMarketplaceSdk | null;
    itemData: Partial<NftItem> | null;
    cryptoCurrencyData: CryptoCurrency | null;
    signature: string | null;
    constructor(nftMarketplaceSdk: NftMarketplaceSdk, itemId: string, itemAmount: string, cryptoCurrencyId: string, cryptoCurrencyAmount: string, userWallet: string, startTimeUtc: string, endTimeUtc: string, item?: OrderItem, currency?: OrderCurrency);
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
