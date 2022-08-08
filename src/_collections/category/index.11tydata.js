module.exports = {
  eleventyComputed: {
    permalink: ({ item }) => {
      return `/category/${item.slug}/`;
    },
    relatedPosts: ({ item: { id }, posts }) => {
      return posts.filter(({ categories }) => categories.indexOf(id) >= 0);
    },
    showAll: '/categories',
    title: ({ item }) => {
      return `Kategorie: \"${item.name}\"`;
    },
  },
};
