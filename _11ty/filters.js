const { createHash } = require('crypto');
const dayjs = require('dayjs');

const dateStringToUTC = (date) => (date.endsWith('Z') ? date : date + 'Z');

module.exports = {
  category: (posts, id) =>
    posts.filter((post) => post.categories.indexOf(id) >= 0),
  dateStringToUTC,
  dateStringFormatted: (date) => {
    return dayjs(date).format('DD. MM. YYYY');
  },
  gravatar: (email, size = 256, fallback = 'robohash') => {
    const hash = createHash('md5').update(email).digest('hex');

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
  hostname: (url) => new URL(url).hostname,
  parseDate: (date) => new Date(Date.parse(dateStringToUTC(date))),
  tag: (posts, id) => posts.filter((post) => post.tags.indexOf(id) >= 0),
};
