import fetchAuthors from './fetchAuthors';
import fetchCategories from './fetchCategories';
import fetchPosts from './fetchPosts';
import fetchTags from './fetchTags';

export const fetchData = async () => {
  const sources = ['authors', 'categories', 'posts', 'tags'];

  console.log('Starting to fetch contents from Wordpress REST API...');

  const data = await Promise.all([
    fetchAuthors(),
    fetchCategories(),
    fetchPosts(),
    fetchTags(),
  ]);

  data.forEach((src, i) =>
    console.info(`Fetched ${src?.length ?? 0} entries for ${sources[i]}.`),
  );

  const [authors, categories, posts, tags] = data.map(
    (src) => `${JSON.stringify(src, null, 2)}\n`,
  );

  return [
    {
      path: 'src/_data/authors.json',
      contents: authors,
    },
    {
      path: 'src/_data/categories.json',
      contents: categories,
    },
    {
      path: 'src/_data/posts.json',
      contents: posts,
    },
    {
      path: 'src/_data/tags.json',
      contents: tags,
    },
  ];
};

export default async () =>
  fetchData().then((data) =>
    data.map(({ contents, path }) => ({
      path,
      contents: Buffer.from(contents).toString('base64'),
    })),
  );
