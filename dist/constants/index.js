"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_NONCE_CHANNEL = exports.ENUM_ASSET_TYPE = exports.CONTRACT_ADDRESSES = exports.CHAIN_ID = exports.NETWORKS = void 0;
exports.NETWORKS = {
    // mainnet
    ETHEREUM: 'ethereum',
    POLYGON: 'polygon',
    // testnets
    GOERLI: 'goerli',
    MUMBAI: 'mumbai',
};
exports.CHAIN_ID = {
    [exports.NETWORKS.ETHEREUM]: 1,
    [exports.NETWORKS.POLYGON]: 137,
    [exports.NETWORKS.GOERLI]: 5,
    [exports.NETWORKS.MUMBAI]: 80001,
};
exports.CONTRACT_ADDRESSES = {
    MARKETPLACE_BASIC_EXCHANGE: {
        [exports.NETWORKS.ETHEREUM]: '0x',
        [exports.NETWORKS.POLYGON]: '0x',
        [exports.NETWORKS.GOERLI]: '0x',
        [exports.NETWORKS.MUMBAI]: '0x',
    },
};
exports.ENUM_ASSET_TYPE = {
    ERC721: '0',
    ERC1155: '1',
    ERC20: '2',
};
exports.MAX_NONCE_CHANNEL = 256;
