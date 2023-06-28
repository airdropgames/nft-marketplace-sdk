import { TypedDataField } from 'ethers';
export declare const verifyEip712Signature: (domain: Object, valueTypes: Record<string, TypedDataField[]>, values: Object, signature: string, address: string) => Promise<boolean>;
export declare const verifyPersonalSignature: (message: string, signature: string, address: string) => Promise<boolean>;
