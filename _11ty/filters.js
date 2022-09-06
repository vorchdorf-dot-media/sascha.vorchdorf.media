const { createHash } = require('crypto');
const { minify } = require('terser');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
require('dayjs/locale/de');

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('de');

const TIMEZONE = process.env.TIMEZONE ?? 'Europe/Vienna';

dayjs.tz.setDefault(TIMEZONE);

const dateStringToUTC = (date) => (date.endsWith('Z') ? date : date + 'Z');

exports.async = {
  jsmin: async (code, callback) => {
    try {
      if (process.env.CONTEXT !== 'production') {
        return callback(null, code);
      }

      const minified = await minify(code);
      return callback(null, minified.code);
    } catch (e) {
      console.error(e);

      return callback(null, code);
    }
  },
};

exports.sync = {
  category: (posts, id) =>
    posts.filter((post) => post.categories.indexOf(id) >= 0),
  dateObj: (date) => ({
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  }),
  dateStringToUTC,
  dateStringFormatted: (date, format = 'D. MMMM YYYY') => {
    return dayjs(date).tz(TIMEZONE).format(format);
  },
  filterBy: (collection, value, key = 'id') => {
    return collection.filter((item) => {
      if (Array.isArray(item)) {
        return item.indexOf(value) >= 0;
      }

      if (typeof item === 'object' && item.hasOwnProperty(key)) {
        const prop = item[key];

        if (Array.isArray(prop)) {
          return prop.indexOf(value) >= 0;
        }

        return prop === value;
      }

      return item === value;
    });
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
  padStart: (str, len = 2, fill = ' ') => `${str}`.padStart(len, fill),
  parseDate: (date) => new Date(Date.parse(dateStringToUTC(date))),
  tag: (posts, id) => posts.filter((post) => post.tags.indexOf(id) >= 0),
  take: (collection, amount, from = 0) => collection.slice(from, amount),
  truncate: (str, len = 140, char = '.') => {
    const summary = str.substring(0, len);
    const [rest] = str.substring(len).split(char);

    return summary + rest + '.';
  },
};
