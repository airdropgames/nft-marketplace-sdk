import BaseApi from '../../services/base.api.services';
import NftMarketplaceSdk from '../../HyperSdk';
import { Collection, CollectionIncludesRequest, CryptoCurrency, ListCollectionsResponse, ListItemsResponse, ListTransactionsResponse, NftItem, CreateTransactionRequestParameters, CreateTransactionResponse, BidOfferRequestParameters, PlatformDataResponse, ListCollectionsRequestParams, ListItemsRequestParams, ListTransactionsRequestParams, RegisterCollectionParams, UpdateCollectionParams } from '../../interfaces';
import { Transaction } from 'ethers';
export declare class TenantApis extends BaseApi {
    hyperPlazaSdk: NftMarketplaceSdk;
    tenantKey: string;
    constructor(hyperPlazaSdk: NftMarketplaceSdk);
    listCollections({ filter, page, limit, sort, includes, search, }: ListCollectionsRequestParams): Promise<ListCollectionsResponse>;
    getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection | null>;
    getCollectionByContractAddress(network: string, contractAddress: string, { includes }: {
        includes?: CollectionIncludesRequest[];
    }): Promise<Collection | null>;
    listNftItems({ filter, page, limit, sort, includes, context }: ListItemsRequestParams): Promise<ListItemsResponse>;
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
    getTransactionPlatformData(transactionId: string, senderAddress: string): Promise<PlatformDataResponse>;
    registerCollection(collectionData: RegisterCollectionParams): Promise<any>;
    updateCollection(id: string, collectionData: UpdateCollectionParams): Promise<Collection>;
}
