# Hyperplaza NFT Marketplace SDK

This SDK is to make integration with our NFT marketplace easier, fully integrated with Hyperplaza NFT Marketplace, written with Typescript ❤️

## Installation

We're currently not publishing the SDK into the `npm` package yet, so you need to install our SDK like this:

```bash
yarn add https://github.com/airdropgames/nft-marketplace-sdk.git
```

or

```bash
npm install https://github.com/airdropgames/nft-marketplace-sdk.git
```

## Sample Usage

We're using typescript to bridging our gap between SDK to our NFT Marketplace backend, it is more safe, maintainable, and of course structured well.

### Initialization

This sample initialize the sdk with the needed parameters. Please replace the parameters according to your need. We're also support both module and commonJS

```js
// module (export & import)
import hyprSDK from 'nft-marketplace-sdk';
const { NftMarketplaceSdk } = hyprSDK;

const baseUrl = 'https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/'; // our base Url
const apiKey = '<<YOUR_API_KEY>>'; // you can get it from our team
const network = '<<YOUR_NETWORK>>'; 
const sdk = new NftMarketplaceSdk(baeUrl, apiKey, network, {
  enableLogging: true,
  // ... any config needed
});
```

```js
const { NftMarketplaceSdk } = require('../../dist/index.js');

async function main() {
  const url = `https://bamal2gltj.execute-api.eu-west-2.amazonaws.com`;
  const key = `<<YOUR_API_KEY>>`; // you can get it from our team
  const network = '<<YOUR_NETWORK>>';
  const hyperSdk = new NftMarketplaceSdk(url, key, network, {
    enableLogging: true,
    // ... any config needed
  });

  const data = await hyperSdk.apis.tenant.getCryptoCurrencyByContractAddress('<contract_address>');
}
```

### Getting data from Hyperplaza NFT Marketplace

Methods under `api` object will bridge the communication with Hypr API

```js
const nftItemId = '004de4df-2f74-4b50-944b-ace304f9b605';
const nftItemData = await sdk.apis.tenant.getNftItemById(itemId);

const collectionId = '3aeb2227-6914-4f92-8784-c8b4aaf51bb5';
const collection = await sdk.apis.tenant.getCollectionById(collectionId);

const cryptoContractAddress = '0x0d787a4a1548f673ed375445535a6c7a1ee56180';
const crypto = await sdk.apis.tenant.getCryptoCurrencyByContractAddress(cryptoContractAddress);
```

### Matching order transaction

This section presents the sample flow of performing "matchOrders". Since in Hypr, we implement offchain order matching, the initial orders are stored to the DB of Hypr. The complete flow of the operation is as the following:

1. A user create initial order (bid/offer), sign the order, then send the order data including the signature to Hypr to be stored
2. Another user that wants to accept the initial order needs to create counter order (if the initial order is bid order, the counter order is offer order, and vice versa), sign and sign the counter order
3. The second user then call the smart contract method `matchOrders` adding the initial order's data, initial order's signature, counter order's data, counter order's signature, platformData and platformDataSignature (additional data from Hypr server like fee, royalty, etc), and the id of the initial order transaction (in the scope of Hypr data).

#### Creating and submitting bid (for offer order, the pattern is quite similar)

```js
// creating a (bid) order
const bidOrder = new BidOrder(
  sdk,
  item: {
    contractAddress: string,
    tokenId: string
    protocolType: 'ERC721' | 'ERC1155'
    value: string // nft amount
    transferData?: string
  },
  currency: {
    contractAddress: string,
    value: string, // crypto value
    transferData?: string
  },
  userWallet,
  startTimeUtc,
  endTimeUtc,
);

// signing (bid) order
const { domain, valueTypes, values } = await bidOrder.buildEip712Data();
const signature = signTypedData(domain, valueTypes, values); // your own typed data signing method
bidOrder.setSignature(signature);
await bidOrder.submit()
```

### accepting (and finalizing) bid / offer order

```js
const txInitiatorId = '18b99dd7-af3e-4c3b-bc3f-a2f1927d6386'; // for example this is a bid transaction to accept
const transactionPlatformData = await sdk.apis.getTransactionPlatformData(txInitiatorId);

const bidOrder = BidOrder.fromTransaction(sdk, transactionPlatformData.transaction);

// create an sign it as the previous section
const offerOrder = ...

// creating blockchain transaction
const transaction = new OffchainMatchOrdersTransaction(
  bidOrder,
  offerOrder, // create it like we create bid order
  transactionPlatformData,
  txInitiatorId // the id of the initial transaction
);

// sending transaction to smart contract
// `contract` here is sample when we use ethers. Please adjust accordingly
await contract.matchOrders(...transaction.buildMatchOrderParams());
```

## API Reference

### `apis`

This object contains all the API methods to communicate with Hypr API

#### `tenant`

This object contains all the API methods to communicate with Hypr API

##### `getNftItemById`

Get NFT Item by its ID

```js
const nftItemId = '004de4df-2f74-4b50-944b-ace304f9b605';
const nftItemData = await sdk.apis.tenant.getNftItemById(itemId);
```

##### `getCollectionById`

Get Collection by its ID

```js
const collectionId = '3aeb2227-6914-4f92-8784-c8b4aaf51bb5';
const collection = await sdk.apis.tenant.getCollectionById(collectionId);
```

##### `getCryptoCurrencyByContractAddress`

Get Crypto Currency by its contract address

```js
const cryptoContractAddress = '0x0d787a4a1548f673ed375445535a6c7a1ee56180';
const crypto = await sdk.apis.tenant.getCryptoCurrencyByContractAddress(cryptoContractAddress);
```

##### `getNftItemsByCollectionId`

Get NFT Items by Collection ID

```js
const collectionId = '3aeb2227-6914-4f92-8784-c8b4aaf51bb5';
const nftItems = await sdk.apis.tenant.getNftItemsByCollectionId(collectionId);
```

##### `getNftItemsByCollectionSlug`

Get NFT Items by Collection Slug

```js
const collectionSlug = 'my-collection';
const nftItems = await sdk.apis.tenant.getNftItemsByCollectionSlug(collectionSlug);
```
