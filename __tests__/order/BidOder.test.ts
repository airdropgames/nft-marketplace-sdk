// unit test for BidOrder class
import NftMarketplaceSdk from '../../src/HyperSdk';
import { BidOrder } from '../../src/lib/order/BidOrder';

describe('BidOrder', () => {
  it('buildEip712Data', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'a');
    const bidOrder = new BidOrder(
      nftMarketplaceSdk,
      'itemId',
      'itemAmount',
      'cryptoCurrencyId',
      'cryptoCurrencyAmount',
      'userWallet',
      'startTimeUtc',
      'endTimeUtc'
    );

    // mocking unrelated method
    const bidOrderFetchRequiredData = jest.spyOn(bidOrder, 'fetchRequiredData').mockImplementation(async () => {
      bidOrder.itemData = {
        collection: {
          protocolType: 'ERC721',
          contractAddress: '0xItemContractAddress',
        },
        tokenId: '1',
      };
      bidOrder.cryptoCurrencyData = {
        contractAddress: '0xCryptoCurrencyAddress',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
      };
    });
    const result = await bidOrder.buildEip712Data('0x0000000000000000000000000000000000000000000000000000000000000002');
    expect(result).toEqual({
      makerAddress: 'userWallet',
      offeredAsset: {
        assetType: '2',
        assetAddress: '0xCryptoCurrencyAddress',
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        value: 'cryptoCurrencyAmount',
      },
      askedAsset: {
        assetType: '0',
        assetAddress: '0xItemContractAddress',
        data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
        value: 'itemAmount',
      },
      start: 'startTimeUtc',
      end: 'endTimeUtc',
    });
    expect(bidOrderFetchRequiredData).toBeCalledTimes(1);
  });

  it('buildEip712Data with explicit item and currency data', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'a');
    const bidOrder = new BidOrder(
      nftMarketplaceSdk,
      'itemId',
      'itemAmount',
      'cryptoCurrencyId',
      'cryptoCurrencyAmount',
      'userWallet',
      'startTimeUtc',
      'endTimeUtc',
      {
        collection: {
          protocolType: 'ERC721',
          contractAddress: '0xItemContractAddress',
        },
        tokenId: '1',
      },
      {
        contractAddress: '0xCryptoCurrencyAddress',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
      }
    );

    const result = await bidOrder.buildEip712Data('0x0000000000000000000000000000000000000000000000000000000000000002');
    expect(result).toEqual({
      makerAddress: 'userWallet',
      offeredAsset: {
        assetType: '2',
        assetAddress: '0xCryptoCurrencyAddress',
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        value: 'cryptoCurrencyAmount',
      },
      askedAsset: {
        assetType: '0',
        assetAddress: '0xItemContractAddress',
        data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
        value: 'itemAmount',
      },
      start: 'startTimeUtc',
      end: 'endTimeUtc',
    });
  });

  it('arrayify', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'a');
    const bidOrder = new BidOrder(
      nftMarketplaceSdk,
      'itemId',
      'itemAmount',
      'cryptoCurrencyId',
      'cryptoCurrencyAmount',
      'userWallet',
      'startTimeUtc',
      'endTimeUtc'
    );

    // mocking unrelated method
    const bidOrderFetchRequiredData = jest.spyOn(bidOrder, 'fetchRequiredData').mockImplementation(async () => {
      bidOrder.itemData = {
        collection: {
          protocolType: 'ERC721',
          contractAddress: '0xItemContractAddress',
        },
        tokenId: '1',
      };
      bidOrder.cryptoCurrencyData = {
        contractAddress: '0xCryptoCurrencyAddress',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
      };
    });
    const result = await bidOrder.arrayify();
    expect(result).toEqual([
      'userWallet',
      '0xCryptoCurrencyAddress',
      '0xItemContractAddress',
      'startTimeUtc',
      'endTimeUtc',
    ]);
    expect(bidOrderFetchRequiredData).toBeCalledTimes(1);
  });
});
