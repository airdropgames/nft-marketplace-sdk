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

  getCryptoCurrency(contractAddress: string): Promise<CryptoCurrency> {
    return axios.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/currencies?contractAddress=${contractAddress}`).then((res) => res.data);
  }

  createBid() { }
  createOffer() { }
  cancelTransaction() { }
  getCollections() { }
  getCollection(id: string, includes: CollectionIncludesRequest[]) {
    return axios.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/collections/${id}?includes=${includes.join(',')}`).then((res) => res.data);
  }
}