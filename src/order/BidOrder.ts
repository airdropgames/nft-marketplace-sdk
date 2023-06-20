import { ethers } from "ethers";
import NftMarketplaceSdk from "..";
import { ENUM_ASSET_TYPE } from "../constants";
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
    currencyId: string,
    currencyAmount: string,
    userWallet: string,
    startTimeUtc: string,
    endTimeUtc: string
  ) {
    super(
      nftMarketplaceSdk,
      itemId,
      itemAmount,
      currencyId,
      currencyAmount,
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
    if (!this.currencyData) {
      throw new Error('currencyData is not set');
    }


    return {
      makerAddress: this.userWallet,
      offeredAsset: {
        assetType: ENUM_ASSET_TYPE.ERC20,
        assetAddress: this.currencyData.contractAddress,
        data: this.currencyData.transferData,
        value: this.currencyData.amount,
      },
      askedAsset: {
        assetType: ENUM_ASSET_TYPE[this.itemData.type as keyof typeof ENUM_ASSET_TYPE],
        assetAddress: this.itemData.contractAddress,
        data: ethers.utils.solidityPack(
          ['uint256', 'bytes'],
          [this.itemData.tokenId, additionalData]
        ),
        value: this.itemData.amount,
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
    if (!this.currencyData) {
      throw new Error('currencyData is not set');
    }
    return [
      this.userWallet,
      this.currencyData.contractAddress,
      this.itemData.contractAddress,
      this.startTimeUtc,
      this.endTimeUtc,
    ];
  }
}

