import qs from 'qs';
import BaseApi from '../../services/base.api.services';
import NftMarketplaceSdk from '../../HyperSdk';
import hyprEndpoints from '../../config/endpoints';
import {
  Collection,
  CollectionIncludesRequest,
  CryptoCurrency,
  ListCollectionsResponse,
  ListItemsResponse,
  ListTransactionsResponse,
  NftItem,
  CreateTransactionRequestParameters,
  CreateTransactionResponse,
  BidOfferRequestParameters,
  PlatformDataResponse,
  ListCollectionsRequestParams,
  ListItemsRequestParams,
  ListTransactionsRequestParams,
  RegisterCollectionParams,
  UpdateCollectionParams,
} from '../../interfaces';
import log from '../../utils/loglevel';
import { Transaction } from 'ethers';
import generalizeUrls from '../../utils/string';
import axios from 'axios';
export class TenantApis extends BaseApi {
  hyperPlazaSdk: NftMarketplaceSdk;

  tenantKey: string = '';

  constructor(hyperPlazaSdk: NftMarketplaceSdk) {
    super({
      baseUrl: hyperPlazaSdk.getUrl(),
      endpoints: hyprEndpoints,
    });
    this.hyperPlazaSdk = hyperPlazaSdk;
    this.tenantKey = this.hyperPlazaSdk.getKey();
  }

  async listCollections({
    filter,
    page,
    limit,
    sort,
    includes = [],
    search,
  }: ListCollectionsRequestParams): Promise<ListCollectionsResponse> {
    try {
      const query = qs.stringify({
        filter,
        page,
        limit,
        sort,
        includes,
        search,
      });
      const data = await this.get<ListCollectionsResponse>({
        endpoint: `${this.endpoints.collection}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Collection not found');
      throw error?.response?.data || String(error);
    }
  }

  async getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection | null> {
    try {
      const query = qs.stringify({ includes });
      const data = await this.get<Collection>({
        endpoint: `${this.endpoints.collection}/${id}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
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
    { includes = [] }: { includes?: CollectionIncludesRequest[] }
  ): Promise<Collection | null> {
    try {
      const query = qs.stringify({
        filter: { collectionContracts: [{ network, contractAddress }] },
        limit: 1,
        includes,
      });
      const data = await this.get<ListCollectionsResponse>({
        endpoint: `${this.endpoints.collection}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data?.data?.length > 0 ? data?.data[0] : null;
    } catch (error: any) {
      log.error(error.message || 'Collection not found');
      throw error?.response?.data || String(error);
    }
  }

  async listNftItems({ filter, page, limit, sort, includes = [], context }: ListItemsRequestParams) {
    try {
      const query = qs.stringify({
        filter,
        page,
        limit,
        sort,
        includes,
        context,
      });

      const data = await this.get<ListItemsResponse>({
        endpoint: `${this.endpoints.item}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
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
        header: this.headers.HeaderAuth(this.tenantKey),
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
    { includes, context }: { includes?: string[]; context?: { callerAddress: string | undefined } } = {}
  ): Promise<NftItem | null> {
    try {
      const query = qs.stringify({
        filter: { collectionContracts: [{ network, contractAddress, tokenId }] },
        limit: 1,
        includes,
        context,
      });
      const data = await this.get<ListItemsResponse>({
        endpoint: `${this.endpoints.item}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
      });

      return data?.data?.length > 0 ? data?.data[0] : null;
    } catch (error: any) {
      log.error(error.message || 'Item not found');
      throw error?.response?.data || String(error);
    }
  }

  async getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency | null> {
    try {
      const query = qs.stringify({ filter: { contractAddress }, limit: 1 });
      const data = await this.get<CryptoCurrency>({
        endpoint: `${this.endpoints.currency}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
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
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Currency not found');
      throw error?.response?.data || String(error);
    }
  }

  async listTransactions({
    filter,
    page,
    limit,
    sort,
    includes = [],
  }: ListTransactionsRequestParams): Promise<ListTransactionsResponse> {
    try {
      const query = qs.stringify({ filter, page, limit, sort, includes });
      const data = await this.get({
        endpoint: `${this.endpoints.transaction}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
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
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async createTransaction(params: CreateTransactionRequestParameters) {
    try {
      const data = await this.post<CreateTransactionRequestParameters, CreateTransactionResponse>({
        endpoint: `${this.endpoints.transaction}`,
        data: params,
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async createBid(params: BidOfferRequestParameters) {
    return this.createTransaction({ ...params, type: 'BID' });
  }

  async createOffer(params: BidOfferRequestParameters) {
    return this.createTransaction({ ...params, type: 'OFFER' });
  }

  async cancelTransaction(id: string) {
    try {
      const data = await this.delete({
        endpoint: `${this.endpoints.transaction}/${id}`,
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async getTransactionPlatformData(transactionId: string, senderAddress: string): Promise<PlatformDataResponse> {
    try {
      if (!senderAddress) {
        throw new Error('Sender address is required');
      }
      const query = qs.stringify({ senderAddress });
      const data = await this.get({
        endpoint: `${this.endpoints.transactionPlatformData}/${transactionId}?${query}`,
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'Transaction not found');
      throw error?.response?.data || String(error);
    }
  }

  async registerCollection(collectionData: RegisterCollectionParams) {
    try {
      const data = await this.post<RegisterCollectionParams, any>({
        endpoint: `${this.endpoints.collection}`,
        data: collectionData,
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'registerCollections failed');
      throw error?.response?.data || String(error);
    }
  }

  async updateCollection(id: string, collectionData: UpdateCollectionParams) {
    try {
      const data = await this.patch<UpdateCollectionParams, Collection>({
        endpoint: `${this.endpoints.collection}/${id}`,
        data: collectionData,
        header: this.headers.HeaderAuth(this.tenantKey),
      });
      return data;
    } catch (error: any) {
      log.error(error.message || 'updateCollection failed');
      throw error?.response?.data || String(error);
    }
  }
  async validatadeUri(uri: string): Promise<Boolean> {
    const url = generalizeUrls(uri);
    if (url == null) {
      return false;
    }
    const result = await axios.get(uri);

    if (!result.data.name || !result.data.image) {
      return false;
    }
    return true;
  }
}
