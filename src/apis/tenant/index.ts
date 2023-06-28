import NftMarketplaceSdk from "../..";
import axios from "axios";
export class TenantApis {
  hyperPlazaSdk: NftMarketplaceSdk;

  constructor(hyperPlazaSdk: NftMarketplaceSdk) {
    this.hyperPlazaSdk = hyperPlazaSdk;
  }

  getNftItem(id: string): Promise<Item> {
    return axios.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/items/${id}`).then((res) => res.data);
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