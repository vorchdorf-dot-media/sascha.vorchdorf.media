module.exports = {
  eleventyComputed: {
    permalink: ({ pagination: { pageNumber } }) => {
      return `/categories${pageNumber ? '/page/' + (pageNumber + 1) : ''}/`;
    },
    title: 'Kategorien',
  },
};
