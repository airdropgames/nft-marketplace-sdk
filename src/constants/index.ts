export const NETWORKS = {
  // mainnet
  ETHEREUM: 'ethereum',
  POLYGON: 'polygon',

  // testnets
  GOERLI: 'goerli',
  MUMBAI: 'mumbai',
};

export const NETWORK_CONFIG = {
  [NETWORKS.ETHEREUM]: {
    chainId: '1',
    marketplaceContractAddress: '0x47Dfd9E84957CE9e880607Fb584C83ff2C3592b1',
  },
  [NETWORKS.POLYGON]: {
    chainId: '137',
    marketplaceContractAddress: '0x',
  },

  [NETWORKS.GOERLI]: {
    chainId: '5',
    marketplaceContractAddress: '0xFf2184A4041f4B93dBb6E7A87Bf6ddB76A845551',
  },
  [NETWORKS.MUMBAI]: {
    chainId: '80001',
    marketplaceContractAddress: '0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2',
  },
};

export const ENUM_ASSET_TYPE = {
  ERC721: '0',
  ERC1155: '1',
  ERC20: '2',
};

export const MAX_NONCE_CHANNEL = 256;
