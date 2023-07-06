import NftMarketplaceSdk from "../../HyperSdk";
import { Order } from './Order';
import { CurrencyBidOfferParams, ItemBidOfferParams, Transaction } from "src/interfaces";
/**
 *
 *
 * @class BidOrder
 * @augments {Order}
 */
export declare class BidOrder extends Order {
    constructor(nftMarketplaceSdk: NftMarketplaceSdk, item: ItemBidOfferParams, currency: CurrencyBidOfferParams, userWallet: string, startTimeUtc: number, endTimeUtc: number);
    /**
     *
     * @inheritdoc Order.buildEip712Data
     */
    buildEip712Data(additionalData: string): Promise<Object>;
    /**
     *
     * @inheritdoc Order.arrayify
     */
    arrayify(): Promise<Array<string | number>>;
    submit(): Promise<any>;
    fromTransaction(nftMarketplaceSdk: NftMarketplaceSdk, transaction: Transaction): Order;
}
