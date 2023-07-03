import BaseApi from "../../services/base.api.services";
import NftMarketplaceSdk from "../../HyperSdk";
import { Collection, CollectionIncludesRequest, CryptoCurrency, NftItem } from "../../interfaces";
export declare class TenantApis extends BaseApi {
    hyperPlazaSdk: NftMarketplaceSdk;
    constructor(hyperPlazaSdk: NftMarketplaceSdk);
    getNftItem(id: string): Promise<NftItem | null>;
    getCryptoCurrencyByContractAddress(contractAddress: string): Promise<CryptoCurrency | null>;
    getCryptoCurrencyById(id: string): Promise<CryptoCurrency | null>;
    createBid(): void;
    createOffer(): void;
    cancelTransaction(): void;
    getCollections(): void;
    getCollectionById(id: string, includes: CollectionIncludesRequest[]): Promise<Collection | null>;
}
