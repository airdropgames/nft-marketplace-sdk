import NftMarketplaceSdk from "../src/HyperSdk";


const instance = new NftMarketplaceSdk(
    'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/',
    'abc',
    'mumbai',
    { enableLogging: true }
);

instance.apis.tenant
    .listTransactions({
        filter: {
            collectionContracts: [{
                contractAddress: '0x19D723c4DE507CeD21377F1e22ae89a2Ba795c97',
                network: 'mumbai',
                tokenId: '113'
            }]
        },
        includes: ['items', 'currencies']
    })
    .then((result) => {
        console.log('result', result);
    }).catch((error) => {
        console.log('error', error);
    });
