import NftMarketplaceSdk from "..";
import { Order } from './Order';
/**
 *
 *
 * @class OfferOrder
 * @augments {Order}
 */
export declare class OfferOrder extends Order {
    constructor(nftMarketplaceSdk: NftMarketplaceSdk, itemId: string, itemAmount: string, currencyId: string, currencyAmount: string, userWallet: string, startTimeUtc: string, endTimeUtc: string);
    /**
     *
     * @inheritdoc Order.buildEip712Data
     */
    buildEip712Data(additionalData: string): Promise<Object>;
    /**
     *
     * @inheritdoc Order.arrayify
     */
    arrayify(): Promise<Array<string>>;
}
