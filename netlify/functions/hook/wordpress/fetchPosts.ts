import fetchEntries from './api';
import { filterObject } from '../helpers';

const WHITELIST = [
  'id',
  'date',
  'modified',
  'slug',
  'status',
  'type',
  'title',
  'excerpt',
  'content_sanitized',
  'attachments',
  'author',
  'categories',
  'tags',
];

export type Post = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content_sanitized: {
    rendered: string;
    plaintext: string;
  };
  attachments: unknown;
  author: string;
  categories: string[];
  tags: string[];
};

export default async (): Promise<Post[]> =>
  fetchEntries<Post>()().then((posts) =>
    posts.map((post) => filterObject(post, WHITELIST, false)),
  );
