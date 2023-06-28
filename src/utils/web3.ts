import { TypedDataField, ethers } from 'ethers';

// reference: https://docs.ethers.org/v5/api/utils/signing-key/#utils-verifyTypedData
export const verifyEip712Signature = async (
    domain: Object,
    valueTypes: Record<string, TypedDataField[]>,
    values: Object,
    signature: string,
    address: string
) => {
    return ethers.utils.verifyTypedData(domain, valueTypes, values, signature) == address;
};

export const verifyPersonalSignature = async (message: string, signature: string, address: string) => {
    return ethers.utils.verifyMessage(message, signature) === address;
};
