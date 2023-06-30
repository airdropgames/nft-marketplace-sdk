type NftItem = {
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