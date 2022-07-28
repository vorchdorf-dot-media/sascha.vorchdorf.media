const fetchEntries = require('./api');
const { filterObject } = require('../helpers');

const WHITELIST = ['id', 'count', 'description', 'name', 'slug'];

module.exports = async () =>
  fetchEntries('tags')().then((tags) =>
    tags.map((tag) => filterObject(tag, WHITELIST, false)),
  );
