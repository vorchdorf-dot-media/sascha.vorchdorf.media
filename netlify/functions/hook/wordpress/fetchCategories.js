const fetchEntries = require('./api');
const { filterObject } = require('../helpers');

const WHITELIST = ['id', 'count', 'description', 'name', 'slug'];

module.exports = async () =>
  fetchEntries('categories')().then((categories) =>
    categories.map((category) => filterObject(category, WHITELIST, false)),
  );
