type CollectionIncludesRequest = 'items';

// sample response
// {"id":"3aeb2227-6914-4f92-8784-c8b4aaf51bb5","name":"Test NFT","symbol":"TNFT","contractAddress":"0x19d723c4de507ced21377f1e22ae89a2ba795c97","ownerAddress":"0xE8B0a2B0Ec112294E6c43cdfDe0Ead401be581e9","protocolType":"ERC721","displayName":null,"description":null,"isLogical":null,"listedAt":"2022-10-28T08:34:09.000Z","createdAt":"2022-10-28T08:34:09.000Z","updatedAt":"2022-10-28T08:34:09.000Z","deletedAt":null,"customAttributes":null,"displayImage":"ipfs://QmQnps7UF7zCBk2bsANKTuXeeuhVRhxcgWfc3AHq2B6gcc","coverImage":null,"fetchCursor":null,"isRetrofit":null,"networkSymbol":"MUMBAI","platformFeePermyriad":null,"royaltyPermyriad":null,"royaltyReceiver":null,"totalVolume":0,"ownerCount":5}
type Collection = {
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
