const { createCommitOnBranch, getExpectedHeadOid } = require('./github');
const wordpress = require('./wordpress');

const handler = async (event, context) => {
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

  await createCommitOnBranch(fileChanges, expectedHeadOid);

  return {
    statusCode: 204,
    body: null,
  };
};
