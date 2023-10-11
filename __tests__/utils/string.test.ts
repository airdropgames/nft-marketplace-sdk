import { generalizeUrls } from '../../src/utils/string';

describe('utils/string', () => {
  describe('generalizeUrls', () => {
    it('should return generalize Url', () => {
      const url = 'https://example.com';
      const result = generalizeUrls(url);
      expect(result).toEqual('https://example.com');
    });
    it('should return generalize Url', () => {
      const url = 'http://example.com';
      const result = generalizeUrls(url);
      expect(result).toEqual('http://example.com');
    });
    it('should return generalize Url', () => {
      const url = 'http://127.0.0.1:3002';
      const result = generalizeUrls(url);
      expect(result).toEqual('http://127.0.0.1:3002');
    });
    it('should return generalize Url', () => {
      const url = 'https://example.com/';
      const result = generalizeUrls(url);
      expect(result).toEqual('https://example.com');
    });
    it('should return generalize Url', () => {
      const url = 'https://www.example.com';
      const result = generalizeUrls(url);
      expect(result).toEqual('https://www.example.com');
    });
  });
});
