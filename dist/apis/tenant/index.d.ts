import BaseApi from '../../services/base.api.services';
import NftMarketplaceSdk from '../../HyperSdk';
import { Collection, CollectionIncludesRequest, CryptoCurrency, ListCollectionsFilter, ListCollectionsResponse, ListCollectionsSort, ListItemsFilter, ListItemsResponse, ListItemsSort, ListTransactionsFilter, ListTransactionsResponse, ListTransactionsSort, NftItem, CreateTransactionRequestParameters, CreateTransactionResponse, BidOfferRequestParameters, PlatformDataSignature } from '../../interfaces';
import { Transaction } from 'ethers';
export declare class TenantApis extends BaseApi {
    hyperPlazaSdk: NftMarketplaceSdk;
    constructor(hyperPlazaSdk: NftMarketplaceSdk);
    listCollections(filter: ListCollectionsFilter, page: number, limit: number, sort: ListCollectionsSort[], includes: string[]): Promise<ListCollectionsResponse>;
    getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection | null>;
    getCollectionByContractAddress(network: string, contractAddress: string, includes: CollectionIncludesRequest[]): Promise<Collection | null>;
    listNftItems(filter: ListItemsFilter, page: number, limit: number, sort: ListItemsSort[], includes: string[]): Promise<ListItemsResponse>;
    getNftItemById(id: string): Promise<NftItem | null>;
    getNftItemByTokenId(network: string, contractAddress: string, tokenId: string, { includes }: {
        includes: string[];
    }): Promise<NftItem | null>;
    getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency | null>;
    getCryptoCurrencyById(id: string): Promise<CryptoCurrency | null>;
    listTransactions(filter: ListTransactionsFilter, page: number, limit: number, sort: ListTransactionsSort[], includes: string[]): Promise<ListTransactionsResponse>;
    getTransactionById(id: string, includes: string[]): Promise<Transaction | null>;
    createTranscaction(params: CreateTransactionRequestParameters): Promise<CreateTransactionResponse>;
    createBid(params: BidOfferRequestParameters): Promise<CreateTransactionResponse>;
    createOffer(params: BidOfferRequestParameters): Promise<CreateTransactionResponse>;
    cancelTransaction(id: string): Promise<any>;
    getTransactionPlatformData(transactionId: string): Promise<PlatformDataSignature>;
}
