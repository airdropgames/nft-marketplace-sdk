import NftMarketplaceSdk from "../../src";
import { Order } from "../../src/order/Order";

class OrderImpl extends Order {
    arrayify(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    buildEip712Data(additionalData: string): Promise<Object> {
        throw new Error("Method not implemented.");
    }
}

describe('Order', () => {
    it('checks setSignature and getSignature', () => {
        const nftMarketplaceSdk = new NftMarketplaceSdk('', '', '');
        const order = new OrderImpl(nftMarketplaceSdk, 'itemId', 'itemAmount', 'cryptoCurrencyId', 'cryptoCurrencyAmount', 'userWallet', 'startTimeUtc', 'endTimeUtc');
        order.setSignature('signature');
        expect(order.getSignature()).toEqual('signature');
    });

    it('checks fetchRequiredData', async () => {
        const nftMarketplaceSdk = new NftMarketplaceSdk('', '', '');
        const sdkGetItemApiMock = jest.spyOn(nftMarketplaceSdk.apis.tenant, 'getItem').mockImplementation(async () => {
            return {
                type: 'ERC721',
                contractAddress: '0xItemContractAddress',
                tokenId: '1',
            };
        });
        const sdkGetCryptoCurrencyApiMock = jest.spyOn(nftMarketplaceSdk.apis.tenant, 'getCryptoCurrency').mockImplementation(async () => {
            return {
                contractAddress: '0xCryptoCurrencyAddress',
            };
        });
        const order = new OrderImpl(nftMarketplaceSdk, 'itemId', 'itemAmount', 'cryptoCurrencyId', 'cryptoCurrencyAmount', 'userWallet', 'startTimeUtc', 'endTimeUtc');
        await order.fetchRequiredData();
        expect(order.itemData).toEqual({ "contractAddress": "0xItemContractAddress", "tokenId": "1", "type": "ERC721" });
        expect(order.cryptoCurrencyData).toEqual({ "contractAddress": "0xCryptoCurrencyAddress" });
        expect(sdkGetItemApiMock).toBeCalledTimes(1);
        expect(sdkGetCryptoCurrencyApiMock).toBeCalledTimes(1);
    });
});