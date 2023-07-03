import BaseApi from "../../services/base.api.services";
import NftMarketplaceSdk from "../../HyperSdk";
import hyprEndpoints from "../../config/endpoints";
import { Collection, CollectionIncludesRequest, CryptoCurrency, NftItem } from "../../interfaces";
import log from "../../utils/loglevel";
export class TenantApis extends BaseApi {
  hyperPlazaSdk: NftMarketplaceSdk;

  constructor(hyperPlazaSdk: NftMarketplaceSdk) {
    super({
      baseUrl: hyperPlazaSdk.getUrl(),
      endpoints: hyprEndpoints
    });
    this.hyperPlazaSdk = hyperPlazaSdk;
  }

  async getNftItem(id: string): Promise<NftItem | null> {
    try {
      const data = await this.get<NftItem>({
        endpoint: `${this.endpoints.getItems}/${id}`,
        header: this.headers.Header()
      });
      return data;
    } catch (error: any) {
      log.error(error.message || "Item not found");
      throw error?.response?.data || error;
    }
  }

  async getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency | null> {
    try {
      const data = await this.get<CryptoCurrency>({
        endpoint: this.endpoints.currency,
        q: `contractAddress=${contractAddress}`
      });
      return data;
    } catch (error: any) {
      log.error(error.message || "Currency not found");
      throw error?.response?.data || error;
    }
  }

  async getCryptoCurrencyById(id: string): Promise<CryptoCurrency | null> {
    try {
      const data = await this.get<CryptoCurrency>({
        endpoint: `${this.endpoints.currency}/${id}`,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || "Currency not found");
      throw error?.response?.data || error;
    }
  }

  createBid() { }
  createOffer() { }
  cancelTransaction() { }
  getCollections() { }

  async getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection | null> {
    try {
      const data = await this.get<Collection>({
        endpoint: `${this.endpoints.collection}/${id}`,
        q: Array.isArray(includes) && includes.length > 0 ? `includes=${includes.join(',')}` : undefined
      });
      return data;
    } catch (error: any) {
      log.error(error.message || "Collection not found");
      throw error?.response?.data || error;
    }
  }
}