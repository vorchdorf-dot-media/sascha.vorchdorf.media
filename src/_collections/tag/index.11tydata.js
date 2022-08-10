module.exports = {
  eleventyComputed: {
    permalink: ({ item }) => {
      return `/tag/${item.slug}/`;
    },
    plural: 'Markierungen',
    showAll: '/tags',
    singular: 'Markierung',
    title: ({ item }) => {
      return `Tag: \"${item.name}\"`;
    },
  },
};
