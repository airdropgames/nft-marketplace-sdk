"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_NONCE_CHANNEL = exports.ENUM_ASSET_TYPE = exports.NETWORK_CONFIG = exports.NETWORKS = void 0;
exports.NETWORKS = {
    // mainnet
    ETHEREUM: 'ethereum',
    POLYGON: 'polygon',
    // testnets
    GOERLI: 'goerli',
    MUMBAI: 'mumbai',
};
exports.NETWORK_CONFIG = {
    [exports.NETWORKS.ETHEREUM]: {
        chainId: '1',
        marketplaceContractAddress: '0x',
    },
    [exports.NETWORKS.POLYGON]: {
        chainId: '137',
        marketplaceContractAddress: '0x',
    },
    [exports.NETWORKS.GOERLI]: {
        chainId: '5',
        marketplaceContractAddress: '0x',
    },
    [exports.NETWORKS.MUMBAI]: {
        chainId: '80001',
        marketplaceContractAddress: '0x0x5F1C00BEEd6B5E08d710f845A6541bFcFB428Ce2',
    }
};
exports.ENUM_ASSET_TYPE = {
    ERC721: '0',
    ERC1155: '1',
    ERC20: '2',
};
exports.MAX_NONCE_CHANNEL = 256;
