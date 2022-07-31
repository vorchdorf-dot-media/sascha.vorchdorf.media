import type { Handler } from '@netlify/functions';

import { createCommitOnBranch, getExpectedHeadOid } from './github';
import wordpress from './wordpress';

export const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        Allow: 'POST',
      },
      body: 'Method Not Allowed',
    };
  }

  // TODO: add authorization header check!

  try {
    const additions = await wordpress();
    console.log('Successfully fetched contents from Wordpress REST API...');

    const expectedHeadOid = await getExpectedHeadOid();
    console.log('Last HEAD commit hash was:', expectedHeadOid);

    const fileChanges = {
      additions,
    };

    const res = await createCommitOnBranch(fileChanges, expectedHeadOid);

    if (res.body.errors || !res.body.data) {
      console.error('Creating commit failed!');
      console.error(res.body.errors);

      return {
        statusCode: 500,
        body: 'Internal Server Error',
      };
    }

    const {
      body: {
        data: {
          createCommitOnBranch: {
            commit: { oid },
          },
        },
      },
    } = res;

    console.log('Successfully created new commit hash:', oid);

    return {
      statusCode: 204,
      body: '',
    };
  } catch (e) {
    console.error('Failed to update Github repository!');
    console.error(e);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
