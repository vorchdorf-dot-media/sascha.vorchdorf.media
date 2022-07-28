const { createCommitOnBranch, getExpectedHeadOid } = require('./github');
const wordpress = require('./wordpress');

const handler = async (event, _context) => {
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

  const additions = await wordpress();
  console.log('Successfully fetched contents from Wordpress REST API...');

  const expectedHeadOid = await getExpectedHeadOid();
  console.log('Last HEAD commit hash was:', expectedHeadOid);

  const fileChanges = {
    additions,
  };

  const res = await createCommitOnBranch(fileChanges, expectedHeadOid);

  if (res.errors || !res.data) {
    console.error('Creating commit failed!');
    console.error(res.errors);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }

  const {
    data: {
      createCommitOnBranch: {
        commit: { oid },
      },
    },
  } = res;

  console.log('Successfully created new commit hash:', oid);

  return {
    statusCode: 204,
    body: null,
  };
};

exports.handler = handler;
