import NftMarketplaceSdk from "../..";
export declare class TenantApis {
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
