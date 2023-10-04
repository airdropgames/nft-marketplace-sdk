import NftMarketplaceSdk from '../src/HyperSdk';

const sdk = new NftMarketplaceSdk('https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/', 'abc', 'goerli', {
  enableLogging: true,
});

const main = async () => {
  return await Promise.all([
    sdk.apis.tenant.validatadeUri('https://sailcraft.dev2023.site/metadata/1.json'),
    sdk.apis.tenant.validatadeUri('http://example.com'),
  ]);
};

main().then(async (result) => {
  const [successResult, failedResult] = result;
  console.log('success res', successResult);
  console.log('failed res', failedResult);
});
