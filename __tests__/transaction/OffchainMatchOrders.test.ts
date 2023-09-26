import NftMarketplaceSdk from '../../src/HyperSdk';
import { BidOrder } from '../../src/lib/order/BidOrder';
import { OfferOrder } from '../../src/lib/order/OfferOrder';
const { OffchainMatchOrdersTransaction } = require('../../src/lib/transaction/OffchainMatchOrders');

describe('OffchainMatchOrdersTransaction', () => {
  // Initialize test data
  const txInitiatorId = 'initiatorId';
  const platformData = {
    royaltyReceiver: '0xroyaltyReceiver',
    royaltyPermyriad: 1000, // 10%
    platformFeePermyriad: 500, // 5%
    nonceChannel: 'channel',
    nonce: 'nonce',
    dataSignature: 'platformDataSignature',
    txInitiatorId,
    signatureExpiryTimestamp: 1691645227,
    validatedOrder: 3,
  };

  test('buildMatchOrderParams returns the correct parameters', async () => {
    const mockBidOrderArrayify = ['1', '2', '3', '4', '5'];
    const mockOfferOrderArrayify = ['5', '4', '3', '2', '1'];
    const mockBidOrderSignature = 'bidOrderSignature';
    const mockOfferOrderSignature = 'offerOrderSignature';

    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const bidOrder = new BidOrder(
      nftMarketplaceSdk,
      { id: 'a', value: '123' },
      { id: 'a', value: '321' },
      '',
      1688561419,
      1688561419
    );
    bidOrder.setSignature(mockBidOrderSignature);
    const offerOrder = new OfferOrder(
      nftMarketplaceSdk,
      { id: 'a', value: '123' },
      { id: 'a', value: '321' },
      '',
      1688561419,
      1688561419
    );
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
        platformData.platformFeePermyriad,
        platformData.signatureExpiryTimestamp,
        platformData.validatedOrder,
      ],
      [platformData.nonceChannel, platformData.nonce, platformData.dataSignature],
      txInitiatorId,
    ];

    const transaction = new OffchainMatchOrdersTransaction(bidOrder, offerOrder, platformData, txInitiatorId);
    const params = await transaction.buildMatchOrderParams();

    expect(params).toEqual(expectedParams);
    expect(bidOrderArrayify).toHaveBeenCalledTimes(1);
    expect(offerOrderArrayify).toHaveBeenCalledTimes(1);
  });
});
