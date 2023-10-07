"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNonceChannel = exports.getRandomNumber = void 0;
const constants_1 = require("../constants");
/**
 * get a random number between 0 and maxExclusiveNumber
 * @param {number} maxExclusiveNumber
 * @returns {number} random number between 0 and maxExclusiveNumber
 */
const getRandomNumber = (maxExclusiveNumber) => {
    return Math.floor(Math.random() * maxExclusiveNumber);
};
exports.getRandomNumber = getRandomNumber;
/**
 * get a random number for nonce channel
 * @returns {number} random nonce channel
 */
const getRandomNonceChannel = () => {
    return (0, exports.getRandomNumber)(constants_1.MAX_NONCE_CHANNEL);
};
exports.getRandomNonceChannel = getRandomNonceChannel;
