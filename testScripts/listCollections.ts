import NftMarketplaceSdk from "../src/HyperSdk";


const instance = new NftMarketplaceSdk(
    'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/',
    'abc',
    'mumbai',
    { enableLogging: true }
);

instance.apis.tenant
    .listCollections({ includes: ['transactions'] })
    .then((result) => {
        console.log('result', result);
    });
