module.exports = {
  eleventyComputed: {
    permalink: ({ pagination: { pageNumber } }) => {
      return `/stories${pageNumber ? '/page/' + (pageNumber + 1) : ''}/`;
    },
    title: 'Stories',
  },
};
