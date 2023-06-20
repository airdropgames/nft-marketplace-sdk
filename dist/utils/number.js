"use strict";
const { MAX_NONCE_CHANNEL } = require('../constants');
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
exports.getRandomNonceChannel = () => {
    return getRandomNumber(MAX_NONCE_CHANNEL);
};
