/**
 * get generalize url
 * @param {string} url
 * @returns {string} random number between 0 and maxExclusiveNumber
 */
const generalizeUrls = (url: string) => {
  if (!url || url === '') {
    return null;
  }

  let _url = url;
  if (url.endsWith('/')) {
    _url = url.slice(0, -1);
  }
  return _url;
};
exports.generalizeUrls = generalizeUrls;