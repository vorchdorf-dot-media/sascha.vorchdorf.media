const fetchEntries = require('./api');
const { filterObject } = require('../helpers');

const WHITELIST = [
  'id',
  'date',
  'modified',
  'slug',
  'status',
  'type',
  'title',
  'excerpt',
  'content_sanitized',
  'attachments',
  'author',
  'categories',
  'tags',
];

module.exports = async () =>
  fetchEntries()().then((posts) =>
    posts.map((post) => filterObject(post, WHITELIST, false)),
  );
