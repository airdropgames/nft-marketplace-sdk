import qs from 'qs';
import BaseApi from '../../services/base.api.services';
import NftMarketplaceSdk from '../../HyperSdk';
import hyprEndpoints from '../../config/endpoints';
import {
  Collection,
  CollectionIncludesRequest,
  CryptoCurrency,
  ListCollectionsFilter,
  ListCollectionsResponse,
  ListCollectionsSort,
  ListItemsFilter,
  ListItemsResponse,
  ListItemsSort,
  ListTransactionsFilter,
  ListTransactionsResponse,
  ListTransactionsSort,
  NftItem,
  CreateTransactionRequestParameters,
  CreateTransactionResponse,
  BidOfferRequestParameters,
  PlatformDataResponse,
} from '../../interfaces';
import log from '../../utils/loglevel';
import { Transaction } from 'ethers';

export class TenantApis extends BaseApi {
  hyperPlazaSdk: NftMarketplaceSdk;

  constructor(hyperPlazaSdk: NftMarketplaceSdk) {
    super({
      baseUrl: hyperPlazaSdk.getUrl(),
      endpoints: hyprEndpoints,
    });
    this.hyperPlazaSdk = hyperPlazaSdk;
  }

  async listCollections(
    filter: ListCollectionsFilter,
    page: number,
    limit: number,
    sort: ListCollectionsSort[],
    includes: string[]
  ): Promise<ListCollectionsResponse> {
    try {
      const query = qs.stringify(
        {
          filter,
          page,
          limit,
          sort,
          includes,
        },
        { allowDots: true }
      );
      const data = await this.get<ListCollectionsResponse>({
        endpoint: `${this.endpoints.collection}?${query}`,
        header: this.headers.Header(),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Collection not found');
      throw error?.response?.data || String(error);
    }
  }

  async getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection | null> {
    try {
      const data = await this.get<Collection>({
        endpoint: `${this.endpoints.collection}/${id}`,
        q: Array.isArray(includes) && includes.length > 0 ? `includes=${includes.join(',')}` : undefined,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Collection not found');
      throw error?.response?.data || String(error);
    }
  }

  async getCollectionByContractAddress(
    network: string,
    contractAddress: string,
    includes: CollectionIncludesRequest[]
  ): Promise<Collection | null> {
    try {
      const query = qs.stringify({ filter: { network, contractAddress }, includes });
      const data = await this.get<ListCollectionsResponse>({
        endpoint: `${this.endpoints.collection}?${query}`,
        q: Array.isArray(includes) && includes.length > 0 ? `includes=${includes.join(',')}` : undefined,
      });
      return data?.data?.length > 0 ? data?.data[0] : null;
    } catch (error: any) {
      log.error(error.message || 'Collection not found');
      throw error?.response?.data || String(error);
    }
  }

  async listNftItems(filter: ListItemsFilter, page: number, limit: number, sort: ListItemsSort[], includes: string[]) {
    try {
      const query = qs.stringify(
        {
          filter,
          page,
          limit,
          sort,
          includes,
        },
        { allowDots: true }
      );

      const data = await this.get<ListItemsResponse>({
        endpoint: `${this.endpoints.item}?${query}}`,
        header: this.headers.Header(),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Items not found');
      throw error?.response?.data || String(error);
    }
  }

  async getNftItemById(id: string): Promise<NftItem | null> {
    try {
      const data = await this.get<NftItem>({
        endpoint: `${this.endpoints.item}/${id}`,
        header: this.headers.Header(),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Item not found');
      throw error?.response?.data || String(error);
    }
  }

  async getNftItemByTokenId(
    network: string,
    contractAddress: string,
    tokenId: string,
    { includes }: { includes?: string[]; } = {}
  ): Promise<NftItem | null> {
    try {
      const query = qs.stringify({ filter: { network, contractAddress, tokenId }, includes });
      const data = await this.get<ListItemsResponse>({
        endpoint: `${this.endpoints.item}?${query}`,
        header: this.headers.Header(),
      });

      return data?.data?.length > 0 ? data?.data[0] : null;
    } catch (error: any) {
      log.error(error.message || 'Item not found');
      throw error?.response?.data || String(error);
    }
  }

  async getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency | null> {
    try {
      const data = await this.get<CryptoCurrency>({
        endpoint: this.endpoints.currency,
        q: `contractAddress=${contractAddress}`,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Currency not found');
      throw error?.response?.data || String(error);
    }
  }

  async getCryptoCurrencyById(id: string): Promise<CryptoCurrency | null> {
    try {
      const data = await this.get<CryptoCurrency>({
        endpoint: `${this.endpoints.currency}/${id}`,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Currency not found');
      throw error?.response?.data || String(error);
    }
  }

  async listTransactions(
    filter: ListTransactionsFilter,
    page: number,
    limit: number,
    sort: ListTransactionsSort[],
    includes: string[]
  ): Promise<ListTransactionsResponse> {
    try {
      const query = qs.stringify({ filter, page, limit, sort, includes });
      const data = await this.get({
        endpoint: `${this.endpoints.transaction}?${query}`,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async getTransactionById(id: string, includes: string[]): Promise<Transaction | null> {
    try {
      const query = qs.stringify({ includes });
      const data = await this.get<Transaction>({
        endpoint: `${this.endpoints.transaction}/${id}?${query}`,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async createTranscaction(params: CreateTransactionRequestParameters) {
    try {
      const data = await this.post<CreateTransactionRequestParameters, CreateTransactionResponse>({
        endpoint: `${this.endpoints.transaction}`,
        data: params,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async createBid(params: BidOfferRequestParameters) {
    return this.createTranscaction({ ...params, type: 'BID' });
  }

  async createOffer(params: BidOfferRequestParameters) {
    return this.createTranscaction({ ...params, type: 'OFFER' });
  }

  async cancelTransaction(id: string) {
    try {
      const data = await this.delete({
        endpoint: `${this.endpoints.transaction}/${id}`,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async getTransactionPlatformData(transactionId: string): Promise<PlatformDataResponse> {
    try {
      const data = await this.get({
        endpoint: `${this.endpoints.transactionPlatformData}/${transactionId}`,
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }
}
