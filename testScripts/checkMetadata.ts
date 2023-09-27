import NftMarketplaceSdk from '../src/HyperSdk';

const sdk = new NftMarketplaceSdk('https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/', 'abc', 'goerli', {
  enableLogging: true,
});

const main = async () => {
  return sdk.apis.tenant.validatadeUri('https://sailcraft.dev2023.site/metadata/1.json');
};

main().then(async (result) => {
  console.log('res', result);
});
