import fetchEntries from './api';
import { filterObject } from '../helpers';

const WHITELIST = ['id', 'description', 'name', 'slug'];

export type Author = {
  id: number;
  description: string;
  name: string;
  slug: string;
};

export default async (): Promise<Author[]> =>
  fetchEntries<Author>('users')().then((users) =>
    users.map((user) => filterObject(user, WHITELIST, false)),
  );
