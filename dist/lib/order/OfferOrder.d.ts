import NftMarketplaceSdk from '../../HyperSdk';
import { Order } from './Order';
import { CreateTransactionResponse, CurrencyBidOfferParams, ItemBidOfferParams, Transaction } from 'src/interfaces';
/**
 *
 *
 * @class OfferOrder
 * @augments {Order}
 */
export declare class OfferOrder extends Order {
    constructor(nftMarketplaceSdk: NftMarketplaceSdk, item: ItemBidOfferParams, currency: CurrencyBidOfferParams, userWallet: string, startTimeUtc: number, endTimeUtc: number);
    /**
     *
     * @inheritdoc Order.buildEip712Data
     */
    buildEip712Data(): Promise<Object>;
    /**
     *
     * @inheritdoc Order.arrayify
     */
    arrayify(): Promise<Array<string | number>>;
    submit(): Promise<CreateTransactionResponse>;
    static fromTransaction(nftMarketplaceSdk: NftMarketplaceSdk, transaction: Transaction): Order;
}
