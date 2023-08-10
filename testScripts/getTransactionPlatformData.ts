import { BidOrder } from '../src/lib/order/BidOrder';
import { OfferOrder } from '../src/lib/order/OfferOrder';
import { OffchainMatchOrdersTransaction } from '../src/lib/transaction/OffchainMatchOrders';
import NftMarketplaceSdk from '../src/HyperSdk';
import { Wallet, ethers } from 'ethers';
import exchangeAbi from "./abis/exchange.json"
import { inspect } from 'util'

const sdk = new NftMarketplaceSdk('https://bamal2gltj.execute-api.eu-west-2.amazonaws.com/', 'AcJunZtSKJG8rohLCowDGlQ4Jwv3rsLg', 'mumbai', {
    enableLogging: true,
});

const getProvider = () => {
  const mumbai = `https://polygon-mumbai.infura.io/v3/2abf317ac68f47b1890e187c552dcdc1`
  return ethers.getDefaultProvider(mumbai)
}

const exchangeAddress = `0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2`

const main = async () => {
    const txInitiatorId = '0c684e00-fc5c-48c4-a6e7-fae4c7939d36'; // for example this is a bid transaction to accept
    const wallet = new ethers.Wallet(`0x4b9fc1b6ae66fa8617b9ddad53eeb2dcb4aaa7fafa4f33e32f62ba394ae31b73`, getProvider());
    let userWallet = wallet.address;

    const transactionPlatformData = await sdk.apis.tenant.getTransactionPlatformData(txInitiatorId, wallet.address);
    const offerOrder = OfferOrder.fromTransaction(sdk, transactionPlatformData.transaction);
    const bidOrder = new BidOrder(
        sdk,
        offerOrder.itemData,
        offerOrder.cryptoCurrencyData,
        userWallet,
        offerOrder.startTimeUtc,
        offerOrder.endTimeUtc
    );
    const { domain, valueTypes, values } = await bidOrder.buildEip712Data() as any;
    console.log({
      domain,
      valueTypes,
      values
    }, "@eip712")
    const signature = await wallet._signTypedData(domain, valueTypes, values);
    console.log(signature, "@signature")
    bidOrder.setSignature(signature);
    const transaction = new OffchainMatchOrdersTransaction(
        bidOrder,
        offerOrder, // create it like we create bid order
        transactionPlatformData,
        txInitiatorId // the id of the initial transaction
    );
    console.log(transaction.platformData, "@platformData")
    const matchOrderParams = await transaction.buildMatchOrderParams();
    console.log({
      matchOrderParams,
      address: userWallet
    })
    const contract = new ethers.Contract(exchangeAddress, exchangeAbi, wallet).connect(wallet)
    const estimatedGas = await contract.estimateGas.matchOrders(...matchOrderParams, { from: wallet.address })
    console.log(estimatedGas, "@estimatedGas")
    // gas estimate: 0.000000000000000001
};

main().then(async (result) => {
    console.log('res', JSON.stringify(result, null, 2));
}).catch((error) => {
    console.log('error', error);
});

// {"order":{"makerAddress":"0x61aa980f7a87067f2da4ca6bc4b05b9b1efe8620","order1":{"assetType":2,"assetAddress":"0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa","data":[],"value":"30000000000000"},"order2":{"assetType":0,"assetAddress":"0x19D723c4DE507CeD21377F1e22ae89a2Ba795c97","data":"0x0000000000000000000000000000000000000000000000000000000000000077","value":1},"start":1686711758,"end":1686798158}}	

// const platformData = {
//     "royaltyReceiver": "0x0000000000000000000000000000000000000000",
//     "royaltyPermyriad": 0,
//     "platformFeePermyriad": 12,
//     "txInitiatorId": "18b99dd7-af3e-4c3b-bc3f-a2f1927d6386",
//     "dataSignature": "0xa1dfd2af6d73062d0ae21531586360957afca041f672feecf5b2651f8f6de1ee1bb897060b7be5274ffa6bc0cb3b9458e2110fdff65a7b0c046435e41a3118d11b",
//     "nonceChannel": 66,
//     "nonce": 1,
//     "transaction": {
//         "id": "18b99dd7-af3e-4c3b-bc3f-a2f1927d6386",
//         "type": "BID",
//         "itemValue": "1",
//         "currencyValue": "20000000000000",
//         "status": "SUBMITTED",
//         "startTimestamp": "2023-01-16T14:07:09.000Z",
//         "endTimestamp": "2023-01-17T14:07:09.000Z",
//         "data": "{\"order\":{\"makerAddress\":\"0x61aa980f7a87067f2da4ca6bc4b05b9b1efe8620\",\"order1\":{\"assetType\":2,\"assetAddress\":\"0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa\",\"data\":[],\"value\":\"20000000000000\"},\"order2\":{\"assetType\":0,\"assetAddress\":\"0x19D723c4DE507CeD21377F1e22ae89a2Ba795c97\",\"data\":\"0x0000000000000000000000000000000000000000000000000000000000000065\",\"value\":1},\"start\":1673878029,\"end\":1673964429},\"orderHash\":\"0x0e8bd19f8dd85c8659e5deac102ae4cb879e2dbdb9caa6b184e380077205c317\"}",
//         "signature": "0xfb2fcc03f24d4371242ed2a8b1e9defd31e937d83a16a3f9b612f7e16b8b552146acbfabff2eb236d21a07495263f62a96ec3fcbc68508785c809663a470a83b1c",
//         "txHash": null,
//         "networkSymbol": "mumbai",
//         "itemId": "ffe5efef-416e-4d88-8a6a-cd5c001ca306",
//         "userId": "0x61aa980f7a87067f2da4ca6bc4b05b9b1efe8620",
//         "currencyId": "c8ca00cb-3e59-4fa4-8314-49d99dd4e243",
//         "source": null,
//         "usdValue": null,
//         "createdAt": "2023-01-16T14:07:15.000Z",
//         "updatedAt": "2023-01-16T14:07:15.000Z",
//         "deletedAt": null,
//         "relatedTransactionId": null,
//         "item": {
//             "id": "ffe5efef-416e-4d88-8a6a-cd5c001ca306",
//             "tokenId": "101",
//             "metadata": "{\"image\":\"ipfs://QmNdvtT9EmrUc6haJyN7ZanHNrsjd23v1ydG6r8jTGEZvq\",\"attributes\":[{\"trait_type\":\"Clothes\",\"value\":\"Navy Striped Tee\"},{\"trait_type\":\"Hat\",\"value\":\"Fisherman's Hat\"},{\"trait_type\":\"Fur\",\"value\":\"Gray\"},{\"trait_type\":\"Background\",\"value\":\"Army Green\"},{\"trait_type\":\"Eyes\",\"value\":\"Eyepatch\"},{\"trait_type\":\"Mouth\",\"value\":\"Bored\"}]}",
//             "name": "101",
//             "description": null,
//             "image": "ipfs://QmNdvtT9EmrUc6haJyN7ZanHNrsjd23v1ydG6r8jTGEZvq",
//             "tokenUri": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/101",
//             "createdAt": "2022-10-28T08:34:09.000Z",
//             "updatedAt": "2023-06-09T04:20:04.000Z",
//             "deletedAt": null,
//             "collectionId": "3aeb2227-6914-4f92-8784-c8b4aaf51bb5",
//             "collection": {
//                 "id": "3aeb2227-6914-4f92-8784-c8b4aaf51bb5",
//                 "name": "Test NFT",
//                 "symbol": "TNFT",
//                 "contractAddress": "0x19D723c4DE507CeD21377F1e22ae89a2Ba795c97",
//                 "ownerAddress": "0x0be2297afd77121717b0ba0e5508941a7d385c2a",
//                 "protocolType": "ERC721",
//                 "displayName": null,
//                 "description": null,
//                 "isLogical": null,
//                 "listedAt": "2022-09-27T03:22:20.000Z",
//                 "createdAt": "2022-09-27T03:22:20.000Z",
//                 "updatedAt": "2022-09-27T03:22:20.000Z",
//                 "deletedAt": null,
//                 "customAttributes": [],
//                 "displayImage": "ipfs://QmQnps7UF7zCBk2bsANKTuXeeuhVRhxcgWfc3AHq2B6gcc",
//                 "coverImage": null,
//                 "fetchCursor": null,
//                 "isRetrofit": null,
//                 "networkSymbol": "mumbai",
//                 "platformFeePermyriad": null,
//                 "royaltyPermyriad": null,
//                 "royaltyReceiver": null
//             }
//         },
//         "currency": {
//             "id": "c8ca00cb-3e59-4fa4-8314-49d99dd4e243",
//             "contractAddress": "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
//             "name": "WETH (mumbai)",
//             "symbol": "WETH",
//             "decimals": 18,
//             "liquidityAddress": "",
//             "networkSymbol": "mumbai",
//             "activatedAt": "2023-01-19T09:56:26.000Z",
//             "createdAt": null,
//             "updatedAt": "2023-01-19T09:56:26.000Z",
//             "deletedAt": null
//         }
//     }
// } as any;
// const bidOrder = BidOrder.fromTransaction(sdk, platformData.transaction);
// bidOrder.buildEip712Data().then(res => console.log('res', res)).catch(err => console.log('err', err));