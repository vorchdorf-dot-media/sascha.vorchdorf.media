import got from 'got';

const REST_API = process.env.REST_API;

if (!REST_API) {
  throw new Error('No REST_API environment variable set!');
}

const searchParams = new URLSearchParams({
  order: 'asc',
  per_page: '100',
});

const fetchEntries =
  <T>(endpoint = 'posts') =>
  async (page = 1, items: T[] = []): Promise<T[]> => {
    try {
      const route = new URL(REST_API);
      route.pathname += route.pathname.endsWith('/')
        ? endpoint
        : '/' + endpoint;

      searchParams.append('page', page.toString());
      route.search = searchParams.toString();

      const { body, headers } = await got<T[]>(route, {
        method: 'GET',
        responseType: 'json',
      });

      const totalPages = parseInt(headers['x-wp-totalpages'] as string, 10);

      if (totalPages > page) {
        return fetchEntries(endpoint)(page + 1, items.concat(body)) as Promise<
          T[]
        >;
      }

      return items.concat(body);
    } catch (e) {
      console.error(e);
      return items;
    }
  };

export default fetchEntries;
