const { createHash } = require('crypto');

const dateStringToUTC = (date) => (date.endsWith('Z') ? date : date + 'Z');

module.exports = {
  dateStringToUTC,
  gravatar: (email, size = 256, fallback = 'robohash') => {
    const hash = createHash('md5').update(email).hex();

    return new URL(
      `/avatar/${hash}?size=${size}&d=${fallback}`,
      'https://gravatar.com',
    ).toString();
  },
  getLatestDate: (collection, fallback) => {
    if (!collection?.length) {
      return fallback || new Date();
    }

    return new Date(
      Math.max(
        ...collection.map(({ date, modified }) =>
          Date.parse(dateStringToUTC(modified ?? date)),
        ),
      ),
    );
  },
  parseDate: (date) => new Date(Date.parse(dateStringToUTC(date))),
  year: (date) => new Date(date).getFullYear(),
  month: (date) => (new Date(date).getMonth() + 1).toString().padStart(2, '0'),
};
