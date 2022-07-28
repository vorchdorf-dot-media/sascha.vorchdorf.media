const fetchAuthors = require('./fetchAuthors');
const fetchCategories = require('./fetchCategories');
const fetchPosts = require('./fetchPosts');
const fetchTags = require('./fetchTags');

module.exports = async () => {
  const [authors, categories, posts, tags] = await Promise.all([
    fetchAuthors(),
    fetchCategories(),
    fetchPosts(),
    fetchTags(),
  ]);

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
