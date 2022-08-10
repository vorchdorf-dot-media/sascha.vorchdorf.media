const filterPosts = (posts, id, key = 'categories') => {
  return posts.filter(({ [key]: values }) =>
    Array.isArray(values)
      ? values.find((item) => item.id === id)
      : values === id,
  );
};

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
