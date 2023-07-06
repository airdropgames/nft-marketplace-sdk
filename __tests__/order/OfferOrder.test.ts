// unit test for OfferOrder class
import NftMarketplaceSdk from '../../src/HyperSdk';
import { OfferOrder } from '../../src/lib/order/OfferOrder';
import { mockGetCurrencyByIdResponse } from '../mocks/currency';
import { mockGetItemByIdResponse } from '../mocks/item';

describe('OfferOrder', () => {
  it('buildEip712Data', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const offerOrder = new OfferOrder(nftMarketplaceSdk, { id: 'a', value: '123' }, { id: 'a', value: '321' }, 'userWallet', 1688561419, 1688561419);

    // mocking unrelated method
    const offerOrderFetchRequiredData = jest.spyOn(offerOrder, 'fetchRequiredData').mockImplementation(async () => {
      offerOrder.itemData = {
        protocolType: 'ERC721',
        contractAddress: '0xItemContractAddress',
        tokenId: '1',
        value: offerOrder.itemData.value,
      };
      offerOrder.cryptoCurrencyData = {
        contractAddress: '0xCryptoCurrencyAddress',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
        value: offerOrder.cryptoCurrencyData.value,
      };
    });
    const result = await offerOrder.buildEip712Data(
      '0x0000000000000000000000000000000000000000000000000000000000000002'
    );
    expect(result).toEqual({ "domain": { "name": "NftMarketplace", "version": "1.0.0", "chainId": "80001", "verifyingContract": "0x0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2" }, "dataTypes": { "PlatformData": [{ "name": "royaltyReceiver", "type": "address" }, { "name": "royaltyPermyriad", "type": "uint256" }, { "name": "feePermyriad", "type": "uint256" }, { "name": "nonceChannel", "type": "uint8" }, { "name": "nonce", "type": "uint256" }, { "name": "txInitiatorId", "type": "string" }] }, "values": { "makerAddress": "userWallet", "offeredAsset": { "assetType": "0", "assetAddress": "0xItemContractAddress", "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002", "value": "123" }, "askedAsset": { "assetType": "2", "assetAddress": "0xCryptoCurrencyAddress", "data": "0x0000000000000000000000000000000000000000000000000000000000000001", "value": "321" }, "start": 1688561419, "end": 1688561419 } });
    expect(offerOrderFetchRequiredData).toBeCalledTimes(1);
  });

  it('buildEip712Data with explicit item and currency data', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const sdkGetItemApiMock = jest.spyOn(nftMarketplaceSdk.apis.tenant, 'getNftItemById').mockImplementation(async () => {
      return mockGetItemByIdResponse as any;
    });
    const sdkGetCryptoCurrencyApiMock = jest.spyOn(nftMarketplaceSdk.apis.tenant, 'getCryptoCurrencyById').mockImplementation(async () => {
      return mockGetCurrencyByIdResponse as any;
    });
    const offerOrder = new OfferOrder(nftMarketplaceSdk, { id: 'a', value: '123' }, { id: 'a', value: '321' }, 'userWallet', 1688561419, 1688561419);

    const result = await offerOrder.buildEip712Data(
      '0x0000000000000000000000000000000000000000000000000000000000000002'
    );
    expect(result).toEqual({ "domain": { "name": "NftMarketplace", "version": "1.0.0", "chainId": "80001", "verifyingContract": "0x0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2" }, "dataTypes": { "PlatformData": [{ "name": "royaltyReceiver", "type": "address" }, { "name": "royaltyPermyriad", "type": "uint256" }, { "name": "feePermyriad", "type": "uint256" }, { "name": "nonceChannel", "type": "uint8" }, { "name": "nonce", "type": "uint256" }, { "name": "txInitiatorId", "type": "string" }] }, "values": { "makerAddress": "userWallet", "offeredAsset": { "assetAddress": "0xCollectionContractAddress", "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002", "value": "123" }, "askedAsset": { "assetType": "2", "assetAddress": "0xCryptoCurrencyAddress", "value": "321" }, "start": 1688561419, "end": 1688561419 } });
  });

  it('arrayify', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('a', 'a', 'mumbai');
    const offerOrder = new OfferOrder(nftMarketplaceSdk, { id: 'a', value: '123' }, { id: 'a', value: '321' }, 'userWallet', 1688561419, 1688561419);

    // mocking unrelated method
    const offerOrderFetchRequiredData = jest.spyOn(offerOrder, 'fetchRequiredData').mockImplementation(async () => {
      offerOrder.itemData = {
        protocolType: 'ERC721',
        contractAddress: '0xItemContractAddress',
        tokenId: '1',
        value: offerOrder.itemData.value,
      };
      offerOrder.cryptoCurrencyData = {
        contractAddress: '0xCryptoCurrencyAddress',
        transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
        value: offerOrder.cryptoCurrencyData.value,
      };
    });
    const result = await offerOrder.arrayify();
    expect(result).toEqual([
      'userWallet',
      '0xItemContractAddress',
      '0xCryptoCurrencyAddress',
      1688561419,
      1688561419
    ]);
    expect(offerOrderFetchRequiredData).toBeCalledTimes(1);
  });
});
