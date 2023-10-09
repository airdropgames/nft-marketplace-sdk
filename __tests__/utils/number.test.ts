import { MAX_NONCE_CHANNEL } from '../../src/constants';
import { getRandomNonceChannel, getRandomNumber } from '../../src/utils/number';

describe('utils/number', () => {
  describe('getRandomNumber', () => {
    it('should return a random number between 0 and maxExclusiveNumber', () => {
      const maxExclusiveNumber = 10;
      const randomNumber = getRandomNumber(maxExclusiveNumber);
      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThan(maxExclusiveNumber);
    });
  });

  describe('getRandomNonceChannel', () => {
    it('should return a random nonce channel', () => {
      const randomNumber = getRandomNonceChannel();
      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThan(MAX_NONCE_CHANNEL);
    });
  });
});
