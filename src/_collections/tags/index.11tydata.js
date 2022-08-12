module.exports = {
  eleventyComputed: {
    permalink: ({ pagination: { pageNumber } }) => {
      return `/tags${pageNumber ? '/page/' + (pageNumber + 1) : ''}/`;
    },
    title: 'Markierungen',
  },
};
