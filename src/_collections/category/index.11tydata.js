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
    tldr: ({ item }) => {
      return item.description?.length ? item.description : undefined;
    },
  },
};
