import { MAX_NONCE_CHANNEL } from '../constants';

/**
 * get a random number between 0 and maxExclusiveNumber
 * @param {number} maxExclusiveNumber
 * @returns {number} random number between 0 and maxExclusiveNumber
 */
export const getRandomNumber = (maxExclusiveNumber: number): number => {
  return Math.floor(Math.random() * maxExclusiveNumber);
};

/**
 * get a random number for nonce channel
 * @returns {number} random nonce channel
 */
export const getRandomNonceChannel = (): number => {
  return getRandomNumber(MAX_NONCE_CHANNEL);
};
