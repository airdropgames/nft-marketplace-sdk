import NftMarketplaceSdk from "../src/HyperSdk";

const sdk = new NftMarketplaceSdk(
    'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/',
    'abc',
    'goerli',
    { enableLogging: true }
);


const main = async () => {
    return sdk.apis.tenant.updateCollection('c89c4646-8122-4362-aeab-15aeeeb529b1', {
        displayName: 'Mock Bored Apes',
        description: 'This is just mock Bored Apes',
    });
};

main().then(async (result) => {
    console.log('res', result);
});