import { BidOrder } from "src/order/BidOrder";
import { OfferOrder } from "src/order/OfferOrder";
export declare class OffchainMatchOrdersTransaction {
    bidOrder: BidOrder | null;
    offerOrder: OfferOrder | null;
    platformData: PlatformData | null;
    platformDataSignature: PlatformDataSignature | null;
    txInitiatorId: string | null;
    /**
     * Creates an instance of OffchainMatchOrdersTransaction.
     * @param bidOrder bid order object
     * @param offerOrder offer order object
     * @param platformData platform data from the NFT Markplace platform
     * @param platformDataSignature signature of the platform data signed by the platform
     * @param txInitiatorId an ID of the transaction that initiates the order
     */
    constructor(bidOrder: BidOrder, offerOrder: OfferOrder, platformData: PlatformData, platformDataSignature: PlatformDataSignature, txInitiatorId: string);
    buildMatchOrderParams(): Promise<(string | string[] | null)[]>;
}
