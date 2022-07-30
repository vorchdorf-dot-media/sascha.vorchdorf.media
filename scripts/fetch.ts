import { writeFile } from 'fs/promises';
import path from 'path';

import { fetchData } from '../netlify/functions/hook/wordpress';

/**
 * For testing purposes only!
 * Performs download of Wordpress data, but instead of committing it into the Github repository,
 * it stores the data files right into the src/_data directory.
 */
fetchData()
  .then((data) =>
    data.map(async ({ contents, path: relativePath }) => {
      try {
        const buffer = new Uint8Array(Buffer.from(contents));

        const p = path.resolve(process.cwd(), relativePath);
        return writeFile(p, buffer, { encoding: 'utf-8' });
      } catch (e) {
        console.error(e);

        return null;
      }
    }),
  )
  .then(() => console.log('Finished fetching Wordpress data'));
