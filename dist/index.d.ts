/**
 * @class HyperPlazaSdk
 * Handles all the interactions with the HyperPlaza API and intermidiate operations
 */
export default class HyperPlazaSdk {
    url: string;
    key: string;
    network: string;
    apis: null;
    /**
     *
     * @param {string} url HyperPlaza API url
     * @param {string} key HyperPlaza API key
     * @param {string} network HyperPlaza network
     */
    constructor(url: string, key: string, network: string);
}
