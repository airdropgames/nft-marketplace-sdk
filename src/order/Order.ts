import NftMarketplaceSdk from "..";

/**
 * @class Order
 * @description Base class for all order types
 *
 */
export abstract class Order {
  itemId = '';
  itemAmount = '';
  currencyId = '';
  currencyAmount = '';
  userWallet = '';
  startTimeUtc = '';
  endTimeUtc = '';

  nftMarketplaceSdk: NftMarketplaceSdk | null = null;
  itemData: Item | null = null;
  currencyData: CryptoCurrency | null = null;
  signature: string | null = null;

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
    this.nftMarketplaceSdk = nftMarketplaceSdk;
    this.itemId = itemId;
    this.itemAmount = itemAmount;
    this.currencyId = currencyId;
    this.currencyAmount = currencyAmount;
    this.userWallet = userWallet;
    this.startTimeUtc = startTimeUtc;
    this.endTimeUtc = endTimeUtc;
  }

  setSignature(signature: string) {
    this.signature = signature;
  }

  getSignature() {
    if (this.signature == null) {
      throw new Error('Order signature is not set');
    }
    return this.signature;
  }

  async fetchRequiredData() {
    if (!this.nftMarketplaceSdk) {
      throw new Error('nftMarketplaceSdk is not set');
    }
    // get item & currency data from amount
    const dataPromises = [];
    dataPromises.push(
      this.itemData == null
        ? this.nftMarketplaceSdk!.apis.tenant.getItem(this.itemId)
        : this.itemData
    );
    dataPromises.push(
      this.currencyData == null
        ? this.nftMarketplaceSdk!.apis.tenant.getCryptoCurrency(this.currencyId)
        : this.currencyData
    );

    const [itemData, currencyData] = await Promise.all(dataPromises);
    this.itemData = itemData as Item;
    this.currencyData = currencyData;
  }

  /**
   * returns the arrified order data
   */
  abstract arrayify(): Promise<Array<string>>;

  /**
   * returns the order data in EIP712 required data format
   */
  abstract buildEip712Data(additionalData: string): Promise<Object>;
}
