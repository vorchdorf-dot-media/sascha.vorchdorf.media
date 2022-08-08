module.exports = {
  eleventyComputed: {
    permalink: ({ pagination: { pageNumber } }) => {
      return `/blog${pageNumber ? '/page/' + (pageNumber + 1) : ''}/`;
    },
    title: 'Einträge',
  },
};
