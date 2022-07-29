import fetchEntries from './api';
import { filterObject } from '../helpers';

const WHITELIST = ['id', 'count', 'description', 'name', 'slug'];

export type Tag = {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
};

export default async (): Promise<Tag[]> =>
  fetchEntries<Tag>('tags')().then((tags) =>
    tags.map((tag) => filterObject(tag, WHITELIST, false)),
  );
