import NftMarketplaceSdk from "../..";
export declare class TenantApis {
    hyperPlazaSdk: NftMarketplaceSdk;
    constructor(hyperPlazaSdk: NftMarketplaceSdk);
    getNftItem(id: string): Promise<Item>;
    getCryptoCurrency(contractAddress: string): Promise<CryptoCurrency>;
    createBid(): void;
    createOffer(): void;
    cancelTransaction(): void;
    getCollections(): void;
    getCollection(): void;
}
