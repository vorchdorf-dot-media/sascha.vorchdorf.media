module.exports = {
  eleventyComputed: {
    permalink: ({ post }) => {
      return `/post/${post.permalink ?? post.slug}/`;
    },
    title: ({
      post: {
        title: { rendered: title },
      },
    }) => {
      return title;
    },
  },
};
