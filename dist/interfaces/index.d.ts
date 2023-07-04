import { TenantApis } from '../apis/tenant';
export type CollectionIncludesRequest = 'items';
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
    transferData?: string;
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
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    collection: Partial<Collection> | null | undefined;
};
export type ListItemsResponse = {
    total: number;
    page: number;
    limit: number;
    data: NftItem[];
};
export type PlatformData = {
    royaltyReceiver: string;
    royaltyPermyriad: string;
    feePermyriad: string;
};
export type PlatformDataSignature = {
    royaltyReceiver: string;
    royaltyPermyriad: number;
    platformFeePermyriad: number;
    txInitiatorId: string;
    dataSignature: string;
    nonceChannel: string;
    nonce: string;
};
type SortCriteria = 'ASC' | 'DESC';
export type ListCollectionsFilter = {
    collectionContracts: {
        network: string;
        contractAddress: string;
    }[];
};
export type ListCollectionsSort = {
    totalVolume: SortCriteria;
} | {
    createdAt: SortCriteria;
};
export type ListItemsFilter = {
    collectionContracts: {
        network: string;
        contractAddress: string;
        tokenId: string;
    }[];
    userAddress: string;
};
export type ListItemsSort = {
    totalVolume: SortCriteria;
} | {
    amount: SortCriteria;
} | {
    lastTransactiondate: SortCriteria;
} | {
    activeBidPrice: SortCriteria;
} | {
    activeOfferPrice: SortCriteria;
};
export type TransactionTypes = 'BID' | 'OFFER';
export type TransactionStatus = 'SUBMITTED' | 'MATCHED' | 'CANCELLED';
export type ListTransactionsFilter = {
    collectionContracts: [
        {
            contractAddress: string;
            network: string;
            tokenId: string;
        }
    ];
    currencies: [
        {
            contractAddress: string;
            network: string;
        }
    ];
    type: TransactionTypes;
    status: TransactionStatus;
    userAddress: string;
};
export type ListTransactionsSort = {
    createdAt: SortCriteria;
} | {
    currencyValue: SortCriteria;
} | {
    price: SortCriteria;
} | {
    itemValue: SortCriteria;
} | {
    startTime: SortCriteria;
} | {
    endTime: SortCriteria;
};
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
export type CreateTransactionRequestParameters = {
    type: 'BID' | 'OFFER';
} & BidOfferRequestParameters;
export type BidOfferRequestParameters = {
    userAddress: string;
    itemId: string;
    itemValue: string;
    currencyId: string;
    currencyValue: string;
    startTimestamp: number;
    endTimestamp: number;
    networkSymbol: string;
    data: string;
    signature: string;
};
export type Transaction = {
    id: String;
    type: TransactionTypes;
    currencyValue: string;
    itemValue: string;
    startTimestampUtc: number;
    endTimestampUtc: number;
    status: TransactionStatus;
    createdAt: string;
    data: string;
    signature: string;
    network: string;
    userId: string;
    currency: CryptoCurrency;
    item: NftItem;
};
export {};
