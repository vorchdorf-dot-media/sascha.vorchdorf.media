import fetchEntries from './api';
import { filterObject } from '../helpers';

const WHITELIST = ['id', 'count', 'description', 'name', 'slug'];

export type Category = {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
};

export default async (): Promise<Category[]> =>
  fetchEntries<Category>('categories')().then((categories) =>
    categories.map((category) => filterObject(category, WHITELIST, false)),
  );
