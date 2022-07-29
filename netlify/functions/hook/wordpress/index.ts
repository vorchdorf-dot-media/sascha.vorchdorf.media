import fetchAuthors from './fetchAuthors';
import fetchCategories from './fetchCategories';
import fetchPosts from './fetchPosts';
import fetchTags from './fetchTags';

export default async () => {
  const data = await Promise.all([
    fetchAuthors(),
    fetchCategories(),
    fetchPosts(),
    fetchTags(),
  ]);

  const [authors, categories, posts, tags] = data.map(
    (src) => `${JSON.stringify(src)}\n`,
  );

  return [
    {
      path: 'src/_data/authors.json',
      contents: Buffer.from(authors).toString('base64'),
    },
    {
      path: 'src/_data/categories.json',
      contents: Buffer.from(categories).toString('base64'),
    },
    {
      path: 'src/_data/posts.json',
      contents: Buffer.from(posts).toString('base64'),
    },
    {
      path: 'src/_data/tags.json',
      contents: Buffer.from(tags).toString('base64'),
    },
  ];
};
