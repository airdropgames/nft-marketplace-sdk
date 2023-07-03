import { PlatformData, PlatformDataSignature } from "src/interfaces";
import { BidOrder } from "src/lib/order/BidOrder";
import { OfferOrder } from "src/lib/order/OfferOrder";

export class OffchainMatchOrdersTransaction {
  bidOrder: BidOrder | null = null;
  offerOrder: OfferOrder | null = null;
  platformData: PlatformData | null = null;
  platformDataSignature: PlatformDataSignature | null = null;
  txInitiatorId: string | null = null;

  /**
   * Creates an instance of OffchainMatchOrdersTransaction.
   * @param bidOrder bid order object
   * @param offerOrder offer order object
   * @param platformData platform data from the NFT Markplace platform
   * @param platformDataSignature signature of the platform data signed by the platform
   * @param txInitiatorId an ID of the transaction that initiates the order
   */
  constructor(
    bidOrder: BidOrder,
    offerOrder: OfferOrder,
    platformData: PlatformData,
    platformDataSignature: PlatformDataSignature,
    txInitiatorId: string
  ) {
    this.bidOrder = bidOrder;
    this.offerOrder = offerOrder;
    this.platformData = platformData;
    this.platformDataSignature = platformDataSignature;
    this.txInitiatorId = txInitiatorId;
  }

  async buildMatchOrderParams() {
    const {
      bidOrder,
      offerOrder,
      platformData,
      platformDataSignature,
      txInitiatorId,
    } = this;
    const params = [
      await bidOrder!.arrayify(),
      bidOrder!.getSignature(),
      await offerOrder!.arrayify(),
      offerOrder!.getSignature(),
      [
        platformData!.royaltyReceiver,
        platformData!.royaltyPermyriad,
        platformData!.feePermyriad,
      ],
      [
        platformDataSignature!.channel,
        platformDataSignature!.nonce,
        platformDataSignature!.signature,
      ],
      txInitiatorId,
    ];
    return params;
  }
}
