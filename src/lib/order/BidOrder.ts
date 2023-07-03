import { ethers } from "ethers";
import NftMarketplaceSdk from "../../HyperSdk";
import { ENUM_ASSET_TYPE } from "../../constants";
import { Order } from './Order';

/**
 *
 *
 * @class BidOrder
 * @augments {Order}
 */
export class BidOrder extends Order {
  constructor(
    nftMarketplaceSdk: NftMarketplaceSdk,
    itemId: string,
    itemAmount: string,
    cryptoCurrencyId: string,
    cryptoCurrencyAmount: string,
    userWallet: string,
    startTimeUtc: string,
    endTimeUtc: string
  ) {
    super(
      nftMarketplaceSdk,
      itemId,
      itemAmount,
      cryptoCurrencyId,
      cryptoCurrencyAmount,
      userWallet,
      startTimeUtc,
      endTimeUtc,
    );
  }

  /**
   * 
   * @inheritdoc Order.buildEip712Data
   */
  async buildEip712Data(additionalData: string): Promise<Object> {
    await this.fetchRequiredData();
    if (!this.itemData) {
      throw new Error('itemData is not set');
    }
    if (!this.cryptoCurrencyData) {
      throw new Error('cryptoCurrencyData is not set');
    }
    if (!this.itemData.collection) {
      throw new Error('itemData.collection is not set');
    }

    return {
      makerAddress: this.userWallet,
      offeredAsset: {
        assetType: ENUM_ASSET_TYPE.ERC20,
        assetAddress: this.cryptoCurrencyData.contractAddress,
        data: this.cryptoCurrencyData.transferData,
        value: this.cryptoCurrencyAmount,
      },
      askedAsset: {
        assetType: ENUM_ASSET_TYPE[this.itemData.collection.protocolType as keyof typeof ENUM_ASSET_TYPE],
        assetAddress: this.itemData.collection.contractAddress,
        data: ethers.utils.solidityPack(
          ['uint256', 'bytes'],
          [this.itemData.tokenId, additionalData]
        ),
        value: this.itemAmount,
      },
      start: this.startTimeUtc,
      end: this.endTimeUtc,
    };
  }

  /**
   * 
   * @inheritdoc Order.arrayify
   */
  async arrayify(): Promise<Array<string>> {
    await this.fetchRequiredData();
    if (!this.itemData) {
      throw new Error('itemData is not set');
    }
    if (!this.cryptoCurrencyData) {
      throw new Error('cryptoCurrencyData is not set');
    }
    if (!this.itemData.collection) {
      throw new Error('itemData.collection is not set');
    }
    return [
      this.userWallet,
      this.cryptoCurrencyData.contractAddress,
      this.itemData.collection.contractAddress,
      this.startTimeUtc,
      this.endTimeUtc,
    ];
  }
}

