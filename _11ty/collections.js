/**
 * Takes an array of posts and returns that array of posts filtered by the given category/tag id.
 *
 * @param {Post[]} posts - the array of posts to filter
 * @param {number} id - the ID of the category/tag to filter by
 * @param {string} key - the key to filter by (either 'categories' or 'tags')
 * @returns the filtered array of posts
 */
const filterPosts = (posts, id, key = 'categories') => {
  return posts.filter(({ [key]: values }) =>
    Array.isArray(values)
      ? values.find((item) => item.id === id)
      : values === id,
  );
};

/**
 * Takes an array of posts and returns the latest timestamp as Date object.
 *
 * @param {Post[]} collection - the array of items to search for the latest date
 * @param {Date} fallback - the date to use if no items are found
 * @returns a Date object representing the date of the latest entry
 */
const getLatestDate = (collection, fallback) => {
  if (!collection?.length) {
    return fallback || new Date();
  }

  return new Date(
    Math.max(
      ...collection.map(({ date, modified }) => Date.parse(modified ?? date)),
    ),
  );
};

/**
 * Takes an array of categories/tags and populates them with the posts that are assigned to them.
 * Additionally adds a 'modified' property to the category/tag that is the latest date of the posts assigned to it.
 *
 * @param {Category[] | Tag[]} collection - the category or tag collection to populate the posts of
 * @param {Post[]} posts - the array of posts to populate the collection with
 * @param {string} key - the key to use for the collection (either 'categories' or 'tags')
 * @returns the input collection with the posts populated and extended with the last modified date
 */
const populate = (collection, posts, key) => {
  if (!Array.isArray(collection)) {
    return [];
  }

  return collection
    .map((item) => {
      if (!item?.count) {
        return null;
      }

      const assignedPosts = filterPosts(posts, item.id, key);
      const modified = getLatestDate(assignedPosts);

      return {
        ...item,
        posts: assignedPosts,
        modified: modified.toISOString(),
      };
    })
    .filter((item) => !!item)
    .sort(({ modified: a }, { modified: b }) => Date.parse(a) - Date.parse(b));
};

/**
 * Reads the available data sources from the _data directory and returns a populated array of all available categories, posts and tags.
 *
 * @returns an object containing arrays of categories, posts and tags with the posts (or categories & tags vice versa) populated
 */
const populatePosts = async () => {
  let categories = [];
  let posts = [];
  let tags = [];

  try {
    try {
      const { default: c } = await import('../src/_data/categories.json', {
        assert: { type: 'json' },
      });

      categories = c;
    } catch (e) {
      console.error(e);
    }

    try {
      const { default: p } = await import('../src/_data/posts.json', {
        assert: { type: 'json' },
      });

      posts = p;
    } catch (e) {
      console.error(e);
    }

    try {
      const { default: t } = await import('../src/_data/tags.json', {
        assert: { type: 'json' },
      });

      tags = t;
    } catch (e) {
      console.error(e);
    }

    posts = posts.map((post) => {
      const { categories: postCategories = [], tags: postTags = [] } = post;
      const assignedCategories = postCategories.map((category) =>
        categories.find(({ id }) => category === id),
      );
      const assignedTags = postTags.map((tag) =>
        tags.find(({ id }) => tag === id),
      );

      return {
        ...post,
        categories: assignedCategories,
        tags: assignedTags,
      };
    });

    categories = populate(categories, posts);
    tags = populate(tags, posts, 'tags');

    return {
      categories,
      posts,
      tags,
    };
  } catch (e) {
    console.error(e);

    return {
      categories,
      posts,
      tags,
    };
  }
};

module.exports = {
  categories: async () => {
    const { categories } = await populatePosts();

    return categories;
  },
  posts: async () => {
    const { posts } = await populatePosts();

    return posts;
  },
  tags: async () => {
    const { tags } = await populatePosts();

    return tags;
  },
};
