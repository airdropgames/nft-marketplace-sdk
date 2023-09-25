describe('utils/string', () => {
  describe('generalizeUrls', () => {
    it('should return generalize Url', () => {
      const { generalizeUrls } = require('../../src/utils/string');
      const url = 'https//example.com/';
      const result = generalizeUrls(url);
      expect(result).toEqual('https//example.com');
    });
  });
});
