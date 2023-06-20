// unit test for OfferOrder class
import NftMarketplaceSdk from '../../src';
import { OfferOrder } from '../../src/order/OfferOrder';

describe('OfferOrder', () => {
  it('buildEip712Data', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('', '', '');
    const offerOrder = new OfferOrder(nftMarketplaceSdk, 'itemId', 'itemAmount', 'cryptoCurrencyId', 'cryptoCurrencyAmount', 'userWallet', 'startTimeUtc', 'endTimeUtc');

    // mocking unrelated method
    const offerOrderFetchRequiredData = jest
      .spyOn(offerOrder, 'fetchRequiredData').mockImplementation(async () => {
        offerOrder.itemData = {
          type: 'ERC721',
          contractAddress: '0xItemContractAddress',
          tokenId: '1',
        };
        offerOrder.cryptoCurrencyData = {
          contractAddress: '0xCryptoCurrencyAddress',
          transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
        };
      });
    const result = await offerOrder.buildEip712Data('0x0000000000000000000000000000000000000000000000000000000000000002');
    expect(result).toEqual({
      makerAddress: 'userWallet',
      offeredAsset: {
        assetType: '0',
        assetAddress: '0xItemContractAddress',
        data: '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002',
        value: 'itemAmount'
      },
      askedAsset: {
        assetType: '2',
        assetAddress: '0xCryptoCurrencyAddress',
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        value: 'cryptoCurrencyAmount'
      },
      start: 'startTimeUtc',
      end: 'endTimeUtc'
    });
    expect(offerOrderFetchRequiredData).toBeCalledTimes(1);
  });

  it('arrayify', async () => {
    const nftMarketplaceSdk = new NftMarketplaceSdk('', '', '');
    const offerOrder = new OfferOrder(nftMarketplaceSdk, 'itemId', 'itemAmount', 'cryptoCurrencyId', 'cryptoCurrencyAmount', 'userWallet', 'startTimeUtc', 'endTimeUtc');

    // mocking unrelated method
    const offerOrderFetchRequiredData = jest
      .spyOn(offerOrder, 'fetchRequiredData').mockImplementation(async () => {
        offerOrder.itemData = {
          type: 'ERC721',
          contractAddress: '0xItemContractAddress',
          tokenId: '1',
        };
        offerOrder.cryptoCurrencyData = {
          contractAddress: '0xCryptoCurrencyAddress',
          transferData: '0x0000000000000000000000000000000000000000000000000000000000000001',
        };
      });
    const result = await offerOrder.arrayify();
    expect(result).toEqual(["userWallet", "0xItemContractAddress", "0xCryptoCurrencyAddress", "startTimeUtc", "endTimeUtc"]);
    expect(offerOrderFetchRequiredData).toBeCalledTimes(1);
  });
});
