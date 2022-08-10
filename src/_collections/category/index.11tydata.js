module.exports = {
  eleventyComputed: {
    permalink: ({ item }) => {
      return `/category/${item.slug}/`;
    },
    plural: 'Kategorien',
    showAll: '/categories',
    singular: 'Kategorie',
    title: ({ item }) => {
      return `Kategorie: \"${item.name}\"`;
    },
  },
};
