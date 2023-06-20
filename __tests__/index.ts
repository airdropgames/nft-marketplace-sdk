import NftMarketplaceSdk from "../src";

describe('HyperPlaza SDK', () => {
    it("should properly initialize the SDK", () => {
        const instance = new NftMarketplaceSdk('', '', '');
        instance.log();
    });
});