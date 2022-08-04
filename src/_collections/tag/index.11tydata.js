module.exports = {
  eleventyComputed: {
    permalink: ({ tag }) => {
      return `/tag/${tag.slug}/`;
    },
    tagPosts: ({ tag: { id }, posts }) => {
      return posts.filter(({ tags }) => tags.indexOf(id) >= 0);
    },
    title: ({ tag }) => {
      return tag.title;
    },
  },
};
