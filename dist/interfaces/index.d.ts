import { TenantApis } from '../apis/tenant';
export type CollectionIncludesRequest = 'items' | 'transactions';
export type Collection = {
    id: string;
    name: string;
    symbol: string | null;
    contractAddress: string;
    ownerAddress: string | null;
    protocolType: string;
    displayName: string | null;
    description: string | null;
    customAttributes: Object | null;
    displayImage: string | null;
    coverImage: string | null;
    fetchCursor: string | null;
    networkSymbol: string;
    platformFeePermyriad: string | null;
    royaltyPermyriad: string | null;
    royaltyReceiver: string | null;
    totalVolume: number;
    ownerCount: number;
    isRetrofit: null;
    isLogical: boolean;
    listedAt: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    items: null | undefined | {
        total: number;
        data: NftItem[];
    };
};
export type ListCollectionsResponse = {
    total: number;
    page: number;
    limit: number;
    data: Collection[];
};
export type HyprTenantApis = {
    tenant: TenantApis;
};
export type HyprSDKOptions = {
    enableLogging: boolean;
};
export type CryptoCurrency = {
    contractAddress: string;
    network: string;
    transferData?: string;
};
export type ItemTransaction = {
    id: string;
    userAddress: string;
    itemValue: string;
    currencyValue: string;
    startTime: string;
    endTime: string;
};
export type NftItem = {
    id: string;
    tokenId: string;
    metadata: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    tokenUri: string | null;
    collectionId: string;
    owners: string[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    collection: Partial<Collection> | null | undefined;
    activeTransactions: null | undefined | ItemTransaction[];
    highestBidTransaction: null | undefined | ItemTransaction;
    lowestOfferTransaction: null | undefined | ItemTransaction;
};
export type ListItemsResponse = {
    total: number;
    page: number;
    limit: number;
    data: NftItem[];
};
export declare enum ValidatedOrder {
    NONE = 0,
    BID = 1,
    OFFER = 2,
    BOTH = 3
}
export type PlatformDataResponse = {
    royaltyReceiver: string;
    royaltyPermyriad: number;
    platformFeePermyriad: number;
    txInitiatorId: string;
    dataSignature: string;
    nonceChannel: string;
    nonce: string;
    transaction: Transaction;
    signatureExpiryTimestamp: number;
    validatedOrder: ValidatedOrder;
};
type SortCriteria = 'ASC' | 'DESC';
export type ListCollectionsFilter = {
    collectionContracts?: {
        network: string;
        contractAddress?: string;
    }[];
};
export type ListCollectionsSort = `totalVolume:${SortCriteria}` | `createdAt:${SortCriteria}`;
export type ListItemsFilter = {
    collectionContracts?: {
        network: string;
        contractAddress?: string;
        tokenId?: string;
    }[];
    userAddress?: string;
};
export type ListItemsSort = `lastTransactionDate:${SortCriteria}` | `totalVolume:${SortCriteria}` | `highestActiveBidPrice:${SortCriteria}` | `lowestActiveOfferPrice:${SortCriteria}`;
export type TransactionTypes = 'BID' | 'OFFER';
export type TransactionStatus = 'SUBMITTED' | 'MATCHED' | 'CANCELLED';
export type ListTransactionsFilter = {
    collectionContracts?: [
        {
            contractAddress?: string;
            network?: string;
            tokenId?: string;
        }
    ];
    currencies?: [
        {
            contractAddress: string;
            network: string;
        }
    ];
    type?: TransactionTypes;
    status?: TransactionStatus;
    userAddress?: string;
};
export type ListCollectionsRequestParams = {
    filter?: ListCollectionsFilter;
    page?: number;
    limit?: number;
    sort?: ListCollectionsSort[];
    includes?: string[];
    search?: string;
};
export type ListItemsRequestParams = {
    filter?: ListItemsFilter;
    page?: number;
    limit?: number;
    sort?: ListItemsSort[];
    includes?: string[];
    context?: ListItemsContext;
};
export type ListItemsContext = {
    callerAddress?: string;
};
export type ListTransactionsRequestParams = {
    filter?: ListTransactionsFilter;
    page?: number;
    limit?: number;
    sort?: ListTransactionsSort[];
    includes?: string[];
};
export type ListTransactionsSort = `createdAt:${SortCriteria}` | `currencyValue:${SortCriteria}` | `usdValue:${SortCriteria}` | `itemValue:${SortCriteria}` | `startTime:${SortCriteria}` | `endTime:${SortCriteria}`;
export type ListTransactionsResponse = {
    total: number;
    page: number;
    limit: number;
    data: Transaction[];
};
export type OrderItem = {
    collection: {
        contractAddress: string;
        protocolType: string;
    };
    tokenId: string;
    transferData?: string;
};
export type OrderCurrency = {
    contractAddress: string;
    transferData?: string;
};
export type CreateTransactionResponse = {
    userAddress: string;
    itemId: string;
    itemValue: string;
    currencyId: string;
    currencyValue: string;
    startTimestamp: number;
    endTimestamp: number;
    networkSymbol: string;
    data: string;
};
export type NftProtocolType = 'ERC721' | 'ERC1155';
export type ItemBidOfferMainParams = {
    value: string;
    transferData?: string;
};
export type ItemBidOfferParams = ItemBidOfferMainParams & ({
    id: string;
} | {
    contractAddress: string;
    tokenId: string;
    protocolType: NftProtocolType;
});
export type CurrencyBidOfferMainParams = {
    value: string;
    transferData?: string;
};
export type CurrencyBidOfferParams = CurrencyBidOfferMainParams & ({
    id: string;
} | {
    contractAddress: string;
});
export type BidOfferRequestParameters = {
    userAddress: string;
    item: ItemBidOfferParams;
    currency: CurrencyBidOfferParams;
    startTimestamp: string;
    endTimestamp: string;
    networkSymbol: string;
    data: string;
    signature: string;
};
export type CreateTransactionRequestParameters = {
    type: 'BID' | 'OFFER';
} & BidOfferRequestParameters;
export type Transaction = {
    id: String;
    type: TransactionTypes;
    currencyValue: string;
    itemValue: string;
    startTimestamp: string;
    endTimestamp: string;
    status: TransactionStatus;
    createdAt: string;
    data: string;
    signature: string;
    network: string;
    userId: string;
    currency: CryptoCurrency;
    item: NftItem;
};
export type RegisterCollectionParams = {
    contractAddress: string;
    network: string;
    platformFeePermyriad: number;
    royaltyReceiver: string;
    royaltyPermyriad: number;
    tenantId: string;
};
export type UpdateCollectionParams = {
    displayName?: string;
    description?: string;
    displayImage?: string;
    coverImage?: string;
    platformFeePermyriad?: number;
    royaltyReceiver?: string;
    royaltyPermyriad?: number;
};
export {};
