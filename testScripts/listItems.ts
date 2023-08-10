import NftMarketplaceSdk from "../src/HyperSdk";


const instance = new NftMarketplaceSdk(
    'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/',
    'oM95Ko6uaN5vOnXczHcYKBgwKP8Ey3HB',
    'goerli',
    { enableLogging: true }
);

instance.apis.tenant
    .listNftItems({
        filter: {
            collectionContracts: [
                {
                    contractAddress: '0x19d723c4de507ced21377f1e22ae89a2ba795c97',
                    network: 'MUMBAI'
                }
            ]
        }, 
        includes: ['transactions'],
        limit: 10,
        page: 1
    })
    .then((result) => {
        console.log('result', JSON.stringify(result, null, 2));
    }).catch((error) => {
        console.log('error', error);
    });
