import NftMarketplaceSdk from "../..";

export class TenantApis {
  hyperPlazaSdk: NftMarketplaceSdk | null = null;

  constructor(hyperPlazaSdk: NftMarketplaceSdk) {
    this.hyperPlazaSdk = hyperPlazaSdk;
  }

  getItem(id: string): Promise<Item> {
    return {} as any;
  }
  getCryptoCurrency(id: string): Promise<CryptoCurrency> {
    return {} as any;
  }

  createBid() { }
  createOffer() { }
  cancelTransaction() { }
  getCollections() { }
  getCollection() { }
}