import NftMarketplaceSdk from "../..";
import axios from "axios";
export class TenantApis {
  hyperPlazaSdk: NftMarketplaceSdk;

  constructor(hyperPlazaSdk: NftMarketplaceSdk) {
    this.hyperPlazaSdk = hyperPlazaSdk;
  }

  getNftItem(id: string): Promise<NftItem> {
    return axios.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/items/${id}`).then((res) => res.data);
  }

  getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency> {
    return axios.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/currencies?contractAddress=${contractAddress}`).then((res) => res.data);
  }
  getCryptoCurrencyById(id: string): Promise<CryptoCurrency> {
    return axios.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/currencies/${id}`).then((res) => res.data);
  }

  createBid() { }
  createOffer() { }
  cancelTransaction() { }
  getCollections() { }

  getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection> {
    return axios.get(`${this.hyperPlazaSdk.url}/api/v1/tenant/collections/${id}?includes=${includes.join(',')}`).then((res) => res.data);
  }
}