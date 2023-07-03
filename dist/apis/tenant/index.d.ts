import BaseApi from "src/services/base.api.services";
import NftMarketplaceSdk from "../../HyperSdk";
import { Collection, CollectionIncludesRequest, CryptoCurrency, NftItem } from "src/interfaces";
export declare class TenantApis extends BaseApi {
    hyperPlazaSdk: NftMarketplaceSdk;
    constructor(hyperPlazaSdk: NftMarketplaceSdk);
    getNftItem(id: string): Promise<NftItem>;
    getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency>;
    getCryptoCurrencyById(id: string): Promise<CryptoCurrency>;
    createBid(): void;
    createOffer(): void;
    cancelTransaction(): void;
    getCollections(): void;
    getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection>;
}
