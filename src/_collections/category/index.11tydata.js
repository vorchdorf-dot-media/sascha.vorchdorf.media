module.exports = {
  eleventyComputed: {
    permalink: ({ category }) => {
      return `/category/${category.slug}/`;
    },
    categoryPosts: ({ category: { id }, posts }) => {
      return posts.filter(({ categories }) => categories.indexOf(id) >= 0);
    },
    title: ({ category }) => {
      return category.name;
    },
  },
};
