import type { Handler } from '@netlify/functions';
import { HTTPError as GotHTTPError } from 'got';

import { createCommitOnBranch, getExpectedHeadOid } from './github';
import { checkAuth, HTTPError } from './helpers';
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

  try {
    checkAuth(event);
  } catch (e) {
    console.error(e);

    if (e instanceof HTTPError) {
      return {
        statusCode: e.status,
        headers: e.headers,
        body: e.message,
      };
    }

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }

  try {
    const additions = await wordpress();
    console.log('Successfully fetched contents from Wordpress REST API...');

    if (!process.env.GITHUB_API_TOKEN) {
      throw new Error('GITHUB_API_TOKEN environment variable is not set!');
    }

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

    if (e instanceof GotHTTPError && e.response?.body) {
      console.error(e.response?.body);
    }

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
