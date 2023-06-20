export const NETWORKS = {
  // mainnet
  ETHEREUM: 'ethereum',
  POLYGON: 'polygon',

  // testnets
  GOERLI: 'goerli',
  MUMBAI: 'mumbai',
};

export const CHAIN_ID = {
  [NETWORKS.ETHEREUM]: 1,
  [NETWORKS.POLYGON]: 137,

  [NETWORKS.GOERLI]: 5,
  [NETWORKS.MUMBAI]: 80001,
};

export const CONTRACT_ADDRESSES = {
  MARKETPLACE_BASIC_EXCHANGE: {
    [NETWORKS.ETHEREUM]: '0x',
    [NETWORKS.POLYGON]: '0x',

    [NETWORKS.GOERLI]: '0x',
    [NETWORKS.MUMBAI]: '0x',
  },
};

export const ENUM_ASSET_TYPE = {
  ERC721: '0',
  ERC1155: '1',
  ERC20: '2',
};

export const MAX_NONCE_CHANNEL = 256;
