import NftMarketplaceSdk from '../src/HyperSdk';
import { BidOrder } from '../src/lib/order/BidOrder';

const instance = new NftMarketplaceSdk('https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/', 'v0F8vvgaAgHzvtbTlKiw8Fgxd7CcNt8s', 'mumbai', {
    enableLogging: true,
});

const bidOrder = new BidOrder(instance, {
    contractAddress: '0xe334e1a346502b2d6d0f0457e8aca7f373e88fd1',
    tokenId: '1',
    value: '1',
    protocolType: 'ERC721',
    transferData: '0x'
}, {
    contractAddress: '0x824982aca154883a3f8895532ba16b717e6725e5',
    value: '120',
    transferData: '0x'
}, '0x18744c0d757e288f16a0c8a3f4edf9fd9bdbe2ee', 1696140000, 1701410400);
bidOrder.setSignature('0x7109e1afe9dafb74d5cfe8940d602dd4f646c5350f56ec1ac08cf93baee55ba87bc0f64b8f650d515eed6cce7b599089eb19f2d3cc11a472f86d90b77f4c3cad1c');

bidOrder.submit()
    .then((result) => {
        console.log('result', result);
    }).catch((error) => { console.log('error', error); });
