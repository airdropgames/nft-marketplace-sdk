import NftMarketplaceSdk from '../../src/HyperSdk';
import { Transaction } from '../../src/interfaces';
import { Order } from '../../src/lib/order/Order';
import { mockGetCurrencyByIdResponse } from '../mocks/currency';
import { mockGetItemByIdResponse } from '../mocks/item';

class OrderImpl extends Order {
  arrayify(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  buildEip712Data(): Promise<Object> {
    throw new Error('Method not implemented.');
  }

  fromTransaction(nftMarketplaceSdk: NftMarketplaceSdk, transaction: Transaction): Order {
    return this;
  }
  submit(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

describe('Order', () => {
  it('checks setSignature and getSignature', () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const order = new OrderImpl(
      nftMarketplaceSdk,
      { id: 'a', value: '123' },
      { id: 'a', value: '321' },
      'userWallet',
      1688561419,
      1688561419
    );
    order.setSignature('signature');
    expect(order.getSignature()).toEqual('signature');
  });

  it('checks fetchRequiredData', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const sdkGetItemApiMock = jest
      .spyOn(nftMarketplaceSdk.apis.tenant, 'getNftItemById')
      .mockImplementation(async () => {
        return mockGetItemByIdResponse as any;
      });
    const sdkGetCryptoCurrencyApiMock = jest
      .spyOn(nftMarketplaceSdk.apis.tenant, 'getCryptoCurrencyById')
      .mockImplementation(async () => {
        return mockGetCurrencyByIdResponse as any;
      });
    const order = new OrderImpl(
      nftMarketplaceSdk,
      { id: 'a', value: '123' },
      { id: 'a', value: '321' },
      'userWallet',
      1688561419,
      1688561419
    );
    await order.fetchRequiredData();

    expect(order.itemData).toEqual({
      id: 'a',
      value: '123',
      contractAddress: '0xCollectionContractAddress',
      tokenId: '1',
    });
    expect(order.cryptoCurrencyData).toEqual({ id: 'a', value: '321', contractAddress: '0xCryptoCurrencyAddress' });
    expect(sdkGetItemApiMock).toBeCalledTimes(1);
    expect(sdkGetCryptoCurrencyApiMock).toBeCalledTimes(1);
  });
});
