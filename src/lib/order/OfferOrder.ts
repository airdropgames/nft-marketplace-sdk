import { ethers } from 'ethers';
import NftMarketplaceSdk from '../../HyperSdk';
import { ENUM_ASSET_TYPE } from '../../constants';
import { Order } from './Order';
import {
  CreateTransactionResponse,
  CurrencyBidOfferParams,
  ItemBidOfferParams,
  NftProtocolType,
  OrderCurrency,
  OrderItem,
  Transaction,
} from 'src/interfaces';
import { getUnixTimestampFromDateString, getMysqlDateTimeString } from '../../utils/date';

/**
 *
 *
 * @class OfferOrder
 * @augments {Order}
 */
export class OfferOrder extends Order {
  constructor(
    nftMarketplaceSdk: NftMarketplaceSdk,
    item: ItemBidOfferParams,
    currency: CurrencyBidOfferParams,
    userWallet: string,
    startTimeUtc: number,
    endTimeUtc: number
  ) {
    super(nftMarketplaceSdk, item, currency, userWallet, startTimeUtc, endTimeUtc);
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
        assetType:
          ENUM_ASSET_TYPE[this.itemData['protocolType' as keyof typeof this.itemData] as keyof typeof ENUM_ASSET_TYPE],
        assetAddress: this.itemData['contractAddress' as keyof typeof this.itemData],
        data: ethers.utils.solidityPack(
          ['uint256', 'bytes'],
          [this.itemData['tokenId' as keyof typeof this.itemData], this.itemData.transferData || '0x']
        ),
        value: this.itemData.value,
      },
      askedAsset: {
        assetType: ENUM_ASSET_TYPE.ERC20,
        assetAddress: this.cryptoCurrencyData['contractAddress' as keyof typeof this.cryptoCurrencyData],
        data: this.cryptoCurrencyData.transferData || '0x',
        value: this.cryptoCurrencyData.value,
      },
      start: this.startTimeUtc,
      end: this.endTimeUtc,
    };

    return {
      ...this.getEip712Constants(),
      values,
    };
  }

  /**
   *
   * @inheritdoc Order.arrayify
   */
  async arrayify(): Promise<Array<string | number>> {
    const { values } = (await this.buildEip712Data()) as any;
    if (!this.itemData) {
      throw new Error('itemData is not set');
    }
    if (!this.cryptoCurrencyData) {
      throw new Error('cryptoCurrencyData is not set');
    }
    return [
      values.makerAddress,
      [
        values.offeredAsset.assetType,
        values.offeredAsset.assetAddress,
        values.offeredAsset.data,
        values.offeredAsset.value,
      ],
      [values.askedAsset.assetType, values.askedAsset.assetAddress, values.askedAsset.data, values.askedAsset.value],
      values.start,
      values.end,
    ];
  }

  async submit(): Promise<CreateTransactionResponse> {
    this.validateOrderBeforeSubmit();
    return this.nftMarketplaceSdk!.apis.tenant.createOffer({
      userAddress: this.userWallet,
      item: this.itemData,
      currency: this.cryptoCurrencyData,
      startTimestamp: getMysqlDateTimeString(this.startTimeUtc),
      endTimestamp: getMysqlDateTimeString(this.endTimeUtc),
      networkSymbol: this.nftMarketplaceSdk!.network,
      data: JSON.stringify({ data: await this.buildEip712Data() }),
      signature: this.signature as string,
    });
  }

  static fromTransaction(nftMarketplaceSdk: NftMarketplaceSdk, transaction: Transaction): Order {
    const offerOrder = new OfferOrder(
      nftMarketplaceSdk,
      {
        protocolType: transaction?.item?.collection?.protocolType as NftProtocolType,
        contractAddress: transaction?.item?.collection?.contractAddress as string,
        tokenId: transaction?.item.tokenId,
        value: transaction?.itemValue,
      },
      {
        contractAddress: transaction?.currency?.contractAddress,
        value: transaction?.currencyValue,
      },
      transaction?.userId,
      getUnixTimestampFromDateString(transaction?.startTimestamp),
      getUnixTimestampFromDateString(transaction?.endTimestamp)
    );
    offerOrder.setSignature(transaction.signature);
    return offerOrder;
  }
}
