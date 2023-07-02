import { TenantApis } from "src/apis/tenant";

// Endpoint
export type HyperEndpoints = {
  getItems: (id: string) => string,
  currency: string,
  collection: string
}

// Collection
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
    items: NftItem[] | null | undefined;
};

// Base
export type HyprTenantApis = {
  tenant: TenantApis
}

export type HyprSDKOptions = {
  enableLogging: boolean;
}

// CryptoCurrency
export type CryptoCurrency = {
  contractAddress: string;
  transferData?: string;
};

// Items
export type NftItem = {
  id: string,
  tokenId: string,
  metadata: string | null,
  name: string | null,
  description: string | null,
  image: string | null,
  tokenUri: string | null,
  collectionId: string,

  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,

  collection: Collection | null | undefined,
};

export type PlatformData = {
  royaltyReceiver: string;
  royaltyPermyriad: string;
  feePermyriad: string;
};

export type PlatformDataSignature = {
  channel: string;
  nonce: string;
  signature: string;
};