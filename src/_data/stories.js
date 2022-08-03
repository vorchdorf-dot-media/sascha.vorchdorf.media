const got = require('got');

const REST_API = process.env.REST_API;
const [subpath] = new URL(REST_API).pathname.split('/wp-json');

/**
 * https://wp.stories.google/ plugin needs to be activated on WordPress
 */
const endpoint = new URL(
  subpath + '/wp-json/web-stories/v1/web-story',
  REST_API,
);

const searchParams = new URLSearchParams({
  order: 'desc',
  per_page: '10',
});

const fetchStories = async (eleventyConfig) => {
  try {
    const {
      eleventy: {
        serverless: { path: { page } } = {
          path: { page: 1 },
        },
      },
    } = eleventyConfig;
    searchParams.append('page', page);
    endpoint.search = searchParams.toString();

    console.log(endpoint.toString());

    const { body, headers } = await got(endpoint, {
      method: 'GET',
      responseType: 'json',
    });

    const totalPages = parseInt(headers['x-wp-totalpages'], 10);

    return {
      totalPages,
      items: body,
    };
  } catch (e) {
    console.error(e);

    return {
      totalPages: 0,
      items: [],
    };
  }
};

module.exports = fetchStories;
