import NftMarketplaceSdk from '../../src/HyperSdk';
import { BidOrder } from '../../src/lib/order/BidOrder';
import { OfferOrder } from '../../src/lib/order/OfferOrder';
const {
  OffchainMatchOrdersTransaction,
} = require('../../src/transaction/OffchainMatchOrders');

describe('OffchainMatchOrdersTransaction', () => {
  // Initialize test data
  const platformData = {
    royaltyReceiver: 'royaltyReceiver',
    royaltyPermyriad: 100,
    feePermyriad: 200,
  };
  const platformDataSignature = {
    channel: 'channel',
    nonce: 'nonce',
    signature: 'platformDataSignature',
  };
  const txInitiatorId = 'initiatorId';

  test('buildMatchOrderParams returns the correct parameters', async () => {
    const mockBidOrderArrayify = ['1', '2', '3', '4', '5'];
    const mockOfferOrderArrayify = ['5', '4', '3', '2', '1'];
    const mockBidOrderSignature = 'bidOrderSignature';
    const mockOfferOrderSignature = 'offerOrderSignature';

    const nftMarketplaceSdk = new NftMarketplaceSdk('', '', '');
    const bidOrder = new BidOrder(nftMarketplaceSdk, '', '', '', '', '', '', '');
    bidOrder.setSignature(mockBidOrderSignature);
    const offerOrder = new OfferOrder(nftMarketplaceSdk, '', '', '', '', '', '', '');
    offerOrder.setSignature(mockOfferOrderSignature);

    // mocking arrayify function, the function will be tested separately
    const bidOrderArrayify = jest
      .spyOn(bidOrder, 'arrayify')
      .mockImplementation(() => Promise.resolve(mockBidOrderArrayify));
    const offerOrderArrayify = jest
      .spyOn(offerOrder, 'arrayify')
      .mockImplementation(() => Promise.resolve(mockOfferOrderArrayify));
    const expectedParams = [
      mockBidOrderArrayify,
      mockBidOrderSignature,
      mockOfferOrderArrayify,
      mockOfferOrderSignature,
      [
        platformData.royaltyReceiver,
        platformData.royaltyPermyriad,
        platformData.feePermyriad,
      ],
      [
        platformDataSignature.channel,
        platformDataSignature.nonce,
        platformDataSignature.signature,
      ],
      txInitiatorId,
    ];

    const transaction = new OffchainMatchOrdersTransaction(
      bidOrder,
      offerOrder,
      platformData,
      platformDataSignature,
      txInitiatorId
    );
    const params = await transaction.buildMatchOrderParams();

    expect(params).toEqual(expectedParams);
    expect(bidOrderArrayify).toHaveBeenCalledTimes(1);
    expect(offerOrderArrayify).toHaveBeenCalledTimes(1);
  });
});
