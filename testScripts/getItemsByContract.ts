import NftMarketplaceSdk from '../src/HyperSdk';

const instance = new NftMarketplaceSdk('https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/', 'abc', 'mumbai', {
    enableLogging: true,
});

instance.apis.tenant
    .getNftItemByTokenId('goerli', '0xdD7B235B7835072351B991f144eeFE92255236cc', '12', { includes: ['transactions'] })
    .then((result) => {
        console.log('result', result);
    });
