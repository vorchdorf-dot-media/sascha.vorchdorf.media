const got = require('got');

const REST_API = process.env.REST_API;

const fetchEntries =
  (endpoint = 'posts') =>
  async (page = 1, items = []) => {
    const route = new URL(REST_API);
    route.pathname += route.pathname.endsWith('/') ? endpoint : '/' + endpoint;
    route.search = searchParams.toString();

    const { body, headers } = await got(route, {
      method: 'GET',
      responseType: 'json',
    });

    const totalPages = parseInt(headers['x-wp-totalpages'], 10);

    if (totalPages > page) {
      return fetchPosts(endpoint)(page + 1, items.concat(body));
    }

    return items.concat(body);
  };

module.exports = fetchEntries;
