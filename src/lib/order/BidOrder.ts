import { ethers } from "ethers";
import NftMarketplaceSdk from "../../HyperSdk";
import { ENUM_ASSET_TYPE } from "../../constants";
import { Order } from './Order';
import { CurrencyBidOfferParams, ItemBidOfferParams, NftProtocolType, OrderCurrency, OrderItem, Transaction } from "src/interfaces";
import { getDateTimestampFromString } from "../../utils/date";

/**
 *
 *
 * @class BidOrder
 * @augments {Order}
 */
export class BidOrder extends Order {
  constructor(
    nftMarketplaceSdk: NftMarketplaceSdk,
    item: ItemBidOfferParams,
    currency: CurrencyBidOfferParams,
    userWallet: string,
    startTimeUtc: number,
    endTimeUtc: number,
  ) {
    super(
      nftMarketplaceSdk,
      item,
      currency,
      userWallet,
      startTimeUtc,
      endTimeUtc,
    );
  }

  /**
   * 
   * @inheritdoc Order.buildEip712Data
   */
  async buildEip712Data(): Promise<Object> {
    await this.fetchRequiredData();
    if (!this.itemData) {
      throw new Error('itemData is not set');
    }
    if (!this.cryptoCurrencyData) {
      throw new Error('cryptoCurrencyData is not set');
    }


    const values = {
      makerAddress: this.userWallet,
      offeredAsset: {
        assetType: ENUM_ASSET_TYPE.ERC20,
        assetAddress: this.cryptoCurrencyData["contractAddress" as keyof typeof this.cryptoCurrencyData],
        data: this.cryptoCurrencyData.transferData || '0x',
        value: this.cryptoCurrencyData.value,
      },
      askedAsset: {
        assetType: ENUM_ASSET_TYPE[this.itemData["protocolType" as keyof typeof this.itemData] as keyof typeof ENUM_ASSET_TYPE],
        assetAddress: this.itemData["contractAddress" as keyof typeof this.itemData],
        data: ethers.utils.solidityPack(
          ['uint256', 'bytes'],
          [this.itemData["tokenId" as keyof typeof this.itemData], this.itemData.transferData || '0x']
        ),
        value: this.itemData.value,
      },
      start: this.startTimeUtc,
      end: this.endTimeUtc,
    };

    return {
      ...this.getEip712Constants(),
      values
    };
  }

  /**
   * 
   * @inheritdoc Order.arrayify
   */
  async arrayify(): Promise<Array<string | number>> {
    await this.fetchRequiredData();
    if (!this.itemData) {
      throw new Error('itemData is not set');
    }
    if (!this.cryptoCurrencyData) {
      throw new Error('cryptoCurrencyData is not set');
    }
    return [
      this.userWallet,
      this.cryptoCurrencyData["contractAddress" as keyof typeof this.cryptoCurrencyData] as string,
      this.itemData["contractAddress" as keyof typeof this.itemData] as string,
      this.startTimeUtc,
      this.endTimeUtc,
    ];
  }

  async submit(): Promise<any> {
    this.validateOrderBeforeSubmit();
    return this.nftMarketplaceSdk!.apis.tenant.createBid({
      userAddress: this.userWallet,
      item: this.itemData,
      currency: this.cryptoCurrencyData,
      startTimestamp: this.startTimeUtc,
      endTimestamp: this.endTimeUtc,
      networkSymbol: this.nftMarketplaceSdk!.network,
      data: JSON.stringify(await this.buildEip712Data()),
      signature: this.signature as string,
    });
  }

  fromTransaction(nftMarketplaceSdk: NftMarketplaceSdk, transaction: Transaction): Order {
    return new BidOrder(
      nftMarketplaceSdk,
      {
        protocolType: transaction.item.collection?.protocolType as NftProtocolType,
        contractAddress: transaction.item.collection?.contractAddress as string,
        tokenId: transaction.item.tokenId,
        value: transaction.itemValue
      },
      {
        contractAddress: transaction.currency.contractAddress,
        value: transaction.currencyValue,
      },
      transaction.userId,
      getDateTimestampFromString(transaction.startTimestamp),
      getDateTimestampFromString(transaction.endTimestamp),
    );
  }
}

