# nft-marketplace-sdk

This SDK is to make integration with our NFT marketplace easier

## Installation

```bash
yarn add github:airdropgames/nft-marketplace-sdk#dev
```

## Usage

```js
import { NftMarketplaceSdk } from 'nft-marketplace-sdk';

// Initialization
const sdk = new NftMarketplaceSdk(baseUrl, apiKey, network);

// api calls example
const itemData = await sdk.api.tenant.getItem(itemId);

// creating a (bid) order
const bidOrder = sdk.createBidOrder(
  itemId,
  itemAmount,
  cryptoCurrencyId,
  cryptoCurrencyAmount,
  userWallet,
  startTimeUtc,
  endTimeUtc
);

// signing (bid) order
const { domain, valueTypes, values } = await bidOrder.buildEip712Data();
const signature = signTypedData(domain, valueTypes, values); // your own typed data signing method
bidOrder.setSignature(signature);

// creating blockchain transaction
const { platformData, platformDataSignature } =
  await sdk.api.tenant.getPlatformDataForTransaction(txInitiatorId);
const transaction = new sdk.transaction.MatchOrdersTransaction(
  bidOrder,
  offerOrder, // create it like we create bid order
  platformData,
  platformDataSignature,
  txInitiatorId // the id of the initial transaction
);

// sending signing and sending transaction to smart contract
await contract.matchOrders(transaction.buildMatchOrderParams());
```
