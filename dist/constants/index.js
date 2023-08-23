"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_NONCE_CHANNEL = exports.ENUM_ASSET_TYPE = exports.NETWORK_CONFIG = exports.NETWORKS = void 0;
exports.NETWORKS = {
    // mainnet
    ETHEREUM: 'eth',
    POLYGON: 'polygon',
    // testnets
    GOERLI: 'goerli',
    MUMBAI: 'mumbai',
};
exports.NETWORK_CONFIG = {
    [exports.NETWORKS.ETHEREUM]: {
        chainId: '1',
        marketplaceContractAddress: '0x47Dfd9E84957CE9e880607Fb584C83ff2C3592b1',
    },
    [exports.NETWORKS.POLYGON]: {
        chainId: '137',
        marketplaceContractAddress: '0x',
    },
    [exports.NETWORKS.GOERLI]: {
        chainId: '5',
        marketplaceContractAddress: '0xFf2184A4041f4B93dBb6E7A87Bf6ddB76A845551',
    },
    [exports.NETWORKS.MUMBAI]: {
        chainId: '80001',
        marketplaceContractAddress: '0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2',
    },
};
exports.ENUM_ASSET_TYPE = {
    ERC721: '0',
    ERC1155: '1',
    ERC20: '2',
};
exports.MAX_NONCE_CHANNEL = 256;
