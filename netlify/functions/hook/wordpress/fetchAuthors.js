const fetchEntries = require('./api');
const { filterObject } = require('../helpers');

const WHITELIST = ['id', 'description', 'name', 'slug'];

module.exports = async () =>
  fetchEntries('users')().then((users) =>
    users.map((user) => filterObject(user, WHITELIST, false)),
  );
