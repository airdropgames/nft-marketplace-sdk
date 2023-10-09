/**
 * get generalize url
 * @param {string} url
 * @returns {string | null} generalized url
 */
export const generalizeUrls = (url: string): string | null => {
  if (!url || url === '') {
    return null;
  }

  let _url = url;
  if (url.endsWith('/')) {
    _url = url.slice(0, -1);
  }
  return _url;
};
