import { BidOrder } from '../src/lib/order/BidOrder';
import NftMarketplaceSdk from "../src/HyperSdk";
import { ethers } from 'ethers';


const sdk = new NftMarketplaceSdk(
    'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/',
    'abc',
    'goerli',
    { enableLogging: true }
);


const main = async () => {
    let item = {} as any;
    let currency = {} as any;
    const wallet = ethers.Wallet.createRandom();
    let userWallet = wallet.address;

    item.contractAddress = '0x0d035b7bd3981047498e60bd548fefca6a2ac9ec';
    item.tokenId = '1'; // you can select tokenId you don't own from the above collection
    item.protocolType = 'ERC721';
    item.value = '1'; // how many you want to bid. But since it's erc721, is should be 1
    item.transferData = '0x';

    currency.contractAddress = '0x1D51E3FfA4De0ac10C78549E52FD4b868C3a89B3';
    currency.value = '1000000'; // in wei
    currency.transferData = '0x';

    let startTimeUtc = 1688900000;
    let endTimeUtc = 1689900000;

    item.network = 'goerli';
    currency.network = 'goerli';

    const bidOrder = new BidOrder(sdk, item, currency, userWallet, startTimeUtc, endTimeUtc);

    const { domain, valueTypes, values } = await bidOrder.buildEip712Data() as any;
    // const signature = "0x131da56c22a679e134fd5aac3df758d2c77fbc86d5893646bdcf58a0559fd1736cbd268ada74fb7719a7ed1f84d85462ec9298f4a937a0cfa5aa1a2e74b3cb971b";
    const signature = await wallet._signTypedData(domain, valueTypes, values);
    bidOrder.setSignature(signature);
    return bidOrder.submit().then(result => console.log('result', result)).catch(error => console.log('error', error));
};

main().then(async (result) => {
    console.log('res', result);
});