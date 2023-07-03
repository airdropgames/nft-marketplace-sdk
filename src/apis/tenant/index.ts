import BaseApi from "src/services/base.api.services";
import NftMarketplaceSdk from "../../HyperSdk";
import hyprEndpoints from "src/config/endpoints";
import { Collection, CollectionIncludesRequest, CryptoCurrency, NftItem } from "src/interfaces";
import log from "src/utils/loglevel";
export class TenantApis extends BaseApi {
  hyperPlazaSdk: NftMarketplaceSdk;

  constructor(hyperPlazaSdk: NftMarketplaceSdk) {
    super({
      baseUrl: hyperPlazaSdk.url,
      endpoints: hyprEndpoints
    })
    this.hyperPlazaSdk = hyperPlazaSdk;
  }

  async getNftItem(id: string): Promise<NftItem> {
    try {
      const data = await this.get<NftItem>({
        endpoint: `${this.endpoints.getItems}/${id}`,
        header: this.headers.Header()
      })
      return data
    } catch (error: any) {
      log.error(error)
      throw new Error(error)
    }
  }

  async getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency> {
    try {
      const data = await this.get<CryptoCurrency>({
        endpoint: this.endpoints.currency,
        q: `contractAddress=${contractAddress}`
      })
      return data
    } catch (error: any) {
      log.error(error)
      throw new Error(error)
    }
  }

  async getCryptoCurrencyById(id: string): Promise<CryptoCurrency> {
    try {
      const data = await this.get<CryptoCurrency>({
        endpoint: `${this.endpoints.currency}/${id}`,
      })
      return data
    } catch (error: any) {
      log.error(error)
      throw new Error(error)
    }
  }

  createBid() { }
  createOffer() { }
  cancelTransaction() { }
  getCollections() { }

  async getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection> {
    try {
      const data = await this.get<Collection>({
        endpoint: `${this.endpoints.collection}/${id}`,
        q: `includes=${includes.join(',')}`
      })
      return data
    } catch (error: any) {
      log.error(error)
      throw new Error(error)
    }
  }
}