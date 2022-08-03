module.exports = {
  eleventyComputed: {
    title: ({
      post: {
        title: { rendered: title },
      },
    }) => {
      return title;
    },
  },
};
