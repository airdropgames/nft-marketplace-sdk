// unit test for BidOrder class
import NftMarketplaceSdk from '../../src/HyperSdk';
import { BidOrder } from '../../src/lib/order/BidOrder';
import { mockGetCurrencyByIdResponse } from '../mocks/currency';
import { mockGetItemByIdResponse } from '../mocks/item';

describe('BidOrder', () => {
  it('buildEip712Data', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const bidOrder = new BidOrder(
      nftMarketplaceSdk,
      { id: 'a', value: '123' },
      { id: 'a', value: '321' },
      'userWallet',
      1688561419,
      1688561419
    );

    // mocking unrelated method
    const bidOrderFetchRequiredData = jest.spyOn(bidOrder, 'fetchRequiredData').mockImplementation(async () => {
      bidOrder.itemData = {
        protocolType: 'ERC721',
        contractAddress: '0xItemContractAddress',
        tokenId: '1',
        value: bidOrder.itemData.value,
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000002',
      };
      bidOrder.cryptoCurrencyData = {
        contractAddress: '0xCryptoCurrencyAddress',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
        value: bidOrder.cryptoCurrencyData.value,
      };
    });
    const result = await bidOrder.buildEip712Data();
    expect(result).toEqual({
      domain: {
        name: 'NftMarketplace',
        version: '1.0.0',
        chainId: '80001',
        verifyingContract: '0x0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2',
      },
      dataTypes: {
        BaseOrder: [
          { name: 'makerAddress', type: 'address' },
          { name: 'offeredAsset', type: 'AssetOrder' },
          { name: 'askedAsset', type: 'AssetOrder' },
          { name: 'start', type: 'uint256' },
          { name: 'end', type: 'uint256' },
        ],
        AssetOrder: [
          { name: 'assetType', type: 'int256' },
          { name: 'assetAddress', type: 'address' },
          { name: 'data', type: 'bytes' },
          { name: 'value', type: 'uint256' },
        ],
      },
      values: {
        makerAddress: 'userWallet',
        offeredAsset: {
          assetType: '2',
          assetAddress: '0xCryptoCurrencyAddress',
          data: '0x0000000000000000000000000000000000000000000000000000000000000001',
          value: '321',
        },
        askedAsset: {
          assetType: '0',
          assetAddress: '0xItemContractAddress',
          data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
          value: '123',
        },
        start: 1688561419,
        end: 1688561419,
      },
    });
    expect(bidOrderFetchRequiredData).toBeCalledTimes(1);
  });

  it('buildEip712Data with explicit item and currency data', async () => {
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
    const bidOrder = new BidOrder(
      nftMarketplaceSdk,
      {
        id: 'a',
        value: '123',
        protocolType: 'ERC721',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000002',
      },
      { id: 'a', value: '321' },
      'userWallet',
      1688561419,
      1688561419
    );

    const result = await bidOrder.buildEip712Data();
    expect(result).toEqual({
      domain: {
        name: 'NftMarketplace',
        version: '1.0.0',
        chainId: '80001',
        verifyingContract: '0x0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2',
      },
      dataTypes: {
        BaseOrder: [
          { name: 'makerAddress', type: 'address' },
          { name: 'offeredAsset', type: 'AssetOrder' },
          { name: 'askedAsset', type: 'AssetOrder' },
          { name: 'start', type: 'uint256' },
          { name: 'end', type: 'uint256' },
        ],
        AssetOrder: [
          { name: 'assetType', type: 'int256' },
          { name: 'assetAddress', type: 'address' },
          { name: 'data', type: 'bytes' },
          { name: 'value', type: 'uint256' },
        ],
      },
      values: {
        makerAddress: 'userWallet',
        offeredAsset: { assetType: '2', assetAddress: '0xCryptoCurrencyAddress', value: '321', data: '0x' },
        askedAsset: {
          assetType: '0',
          assetAddress: '0xCollectionContractAddress',
          data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
          value: '123',
        },
        start: 1688561419,
        end: 1688561419,
      },
    });
    expect(sdkGetItemApiMock).toBeCalledTimes(1);
    expect(sdkGetCryptoCurrencyApiMock).toBeCalledTimes(1);
  });

  it('arrayify', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const bidOrder = new BidOrder(
      nftMarketplaceSdk,
      { id: 'a', value: '123' },
      { id: 'a', value: '321' },
      'userWallet',
      1688561419,
      1688561419
    );

    // mocking unrelated method
    const bidOrderFetchRequiredData = jest.spyOn(bidOrder, 'fetchRequiredData').mockImplementation(async () => {
      bidOrder.itemData = {
        protocolType: 'ERC721',
        contractAddress: '0xItemContractAddress',
        tokenId: '1',
        value: bidOrder.itemData.value,
      };
      bidOrder.cryptoCurrencyData = {
        contractAddress: '0xCryptoCurrencyAddress',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
        value: bidOrder.cryptoCurrencyData.value,
      };
    });
    const result = await bidOrder.arrayify();
    expect(result).toEqual(['userWallet', '0xCryptoCurrencyAddress', '0xItemContractAddress', 1688561419, 1688561419]);
    expect(bidOrderFetchRequiredData).toBeCalledTimes(1);
  });
});
