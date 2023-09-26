import { PlatformDataResponse } from 'src/interfaces';
import { BidOrder } from 'src/lib/order/BidOrder';
import { OfferOrder } from 'src/lib/order/OfferOrder';
export declare class OffchainMatchOrdersTransaction {
    bidOrder: BidOrder;
    offerOrder: OfferOrder;
    platformData: PlatformDataResponse;
    txInitiatorId: string;
    /**
     * Creates an instance of OffchainMatchOrdersTransaction.
     * @param bidOrder bid order object
     * @param offerOrder offer order object
     * @param platformData platform data from the NFT Markplace platform
     * @param platformDataSignature signature of the platform data signed by the platform
     * @param txInitiatorId an ID of the transaction that initiates the order
     */
    constructor(bidOrder: BidOrder, offerOrder: OfferOrder, platformData: PlatformDataResponse, txInitiatorId: string);
    buildMatchOrderParams(): Promise<(string | (string | number)[])[]>;
}
