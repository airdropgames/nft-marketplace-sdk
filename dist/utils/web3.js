"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPersonalSignature = exports.verifyEip712Signature = void 0;
const ethers_1 = require("ethers");
// reference: https://docs.ethers.org/v5/api/utils/signing-key/#utils-verifyTypedData
const verifyEip712Signature = async (domain, valueTypes, values, signature, address) => {
    return ethers_1.ethers.utils.verifyTypedData(domain, valueTypes, values, signature) == address;
};
exports.verifyEip712Signature = verifyEip712Signature;
const verifyPersonalSignature = async (message, signature, address) => {
    return ethers_1.ethers.utils.verifyMessage(message, signature) === address;
};
exports.verifyPersonalSignature = verifyPersonalSignature;
