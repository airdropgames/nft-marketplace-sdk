import NftMarketplaceSdk from "../src/HyperSdk";


const instance = new NftMarketplaceSdk(
    'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/',
    'abc',
    'mumbai',
    { enableLogging: true }
);

instance.apis.tenant
    .getNftItemByTokenId('mumbai', '0x19d723c4de507ced21377f1e22ae89a2ba795c97', '101', { includes: ['transactions'] })
    .then((result) => {
        console.log('result', result);
    });
