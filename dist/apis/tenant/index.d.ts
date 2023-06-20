import NftMarketplaceSdk from "../..";
export declare class TenantApis {
    hyperPlazaSdk: NftMarketplaceSdk | null;
    constructor(hyperPlazaSdk: NftMarketplaceSdk);
    getItem(id: string): Promise<Item>;
    getCryptoCurrency(id: string): Promise<CryptoCurrency>;
    createBid(): void;
    createOffer(): void;
    cancelTransaction(): void;
    getCollections(): void;
    getCollection(): void;
}
