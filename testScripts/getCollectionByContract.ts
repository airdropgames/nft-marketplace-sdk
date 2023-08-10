import NftMarketplaceSdk from "../src/HyperSdk";


const instance = new NftMarketplaceSdk(
    'http://127.0.0.1:3000',
    'eSJ8b3APtS6esoEN2Aa70RhyMkdnh7Fy',
    'mumbai',
    { enableLogging: true }
);

instance.apis.tenant
    .getCollectionByContractAddress('mumbai', '0x19d723c4de507ced21377f1e22ae89a2ba795c97', { includes: ['transactions', 'items'] })
    .then((result) => {
      console.log('result', JSON.stringify(result, null, 2));
    }).catch((error) => {
      console.log('error', error);
    });
