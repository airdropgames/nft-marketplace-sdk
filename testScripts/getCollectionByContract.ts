import NftMarketplaceSdk from "../src/HyperSdk";


const instance = new NftMarketplaceSdk(
    'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/',
    'abc',
    'goerli',
    { enableLogging: true }
);

instance.apis.tenant
    .getCollectionByContractAddress('goerli', '0xdD7B235B7835072351B991f144eeFE92255236cc', { includes: ['transactions', 'items'] })
    .then((result) => {
        console.log('result', JSON.stringify(result, null, 2));
    }).catch((error) => {
        console.log('error', error);
    });
