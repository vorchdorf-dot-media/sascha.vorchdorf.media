module.exports = {
  eleventyComputed: {
    permalink: ({ item }) => {
      return `/tag/${item.slug}/`;
    },
    relatedPosts: ({ item: { id }, posts }) => {
      return posts.filter(({ tags }) => tags.indexOf(id) >= 0);
    },
    showAll: '/tags',
    title: ({ item }) => {
      return `Tag: \"${item.name}\"`;
    },
  },
};
