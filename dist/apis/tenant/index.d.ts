import BaseApi from '../../services/base.api.services';
import NftMarketplaceSdk from '../../HyperSdk';
import { Collection, CollectionIncludesRequest, CryptoCurrency, ListCollectionsResponse, ListItemsResponse, ListTransactionsResponse, NftItem, CreateTransactionRequestParameters, CreateTransactionResponse, BidOfferRequestParameters, PlatformDataResponse, ListCollectionsRequestParams, ListItemsRequestParams, ListTransactionsRequestParams } from '../../interfaces';
import { Transaction } from 'ethers';
export declare class TenantApis extends BaseApi {
    hyperPlazaSdk: NftMarketplaceSdk;
    constructor(hyperPlazaSdk: NftMarketplaceSdk);
    listCollections({ filter, page, limit, sort, includes, }: ListCollectionsRequestParams): Promise<ListCollectionsResponse>;
    getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection | null>;
    getCollectionByContractAddress(network: string, contractAddress: string, { includes }: {
        includes?: CollectionIncludesRequest[];
    }): Promise<Collection | null>;
    listNftItems({ filter, page, limit, sort, includes }: ListItemsRequestParams): Promise<ListItemsResponse>;
    getNftItemById(id: string): Promise<NftItem | null>;
    getNftItemByTokenId(network: string, contractAddress: string, tokenId: string, { includes }?: {
        includes?: string[];
    }): Promise<NftItem | null>;
    getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency | null>;
    getCryptoCurrencyById(id: string): Promise<CryptoCurrency | null>;
    listTransactions({ filter, page, limit, sort, includes, }: ListTransactionsRequestParams): Promise<ListTransactionsResponse>;
    getTransactionById(id: string, includes: string[]): Promise<Transaction | null>;
    createTransaction(params: CreateTransactionRequestParameters): Promise<CreateTransactionResponse>;
    createBid(params: BidOfferRequestParameters): Promise<CreateTransactionResponse>;
    createOffer(params: BidOfferRequestParameters): Promise<CreateTransactionResponse>;
    cancelTransaction(id: string): Promise<any>;
    getTransactionPlatformData(transactionId: string): Promise<PlatformDataResponse>;
}
