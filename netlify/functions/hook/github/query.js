const { default: got } = require('got/dist/source');
const { graphql } = require('graphql');

const pkg = require('../../../../package.json');

const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;
const GITHUB_API_ENDPOINT = 'https://api.github.com/graphql';

const QUERY = graphql`
  query repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      ref(qualifiedName: "main") {
        target {
          oid
        }
      }
    }
  }
`;

module.exports = async () => {
  const [owner, name] = new URL(pkg.repository).pathname
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .split('/');

  const body = {
    query: QUERY,
    variables: {
      name,
      owner,
    },
  };

  const res = await got(GITHUB_API_ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `bearer ${GITHUB_API_TOKEN}`,
      'content-type': 'application/json',
    },
    body: body.toString(),
    responseType: 'json',
  });

  if (res.body.errors || !res.body.data) {
    throw new Error(body.errors ?? 'Request fetching last commit ID failed!');
  }

  const {
    body: {
      data: {
        repository: {
          ref: {
            target: { oid },
          },
        },
      },
    },
  } = res;

  return oid;
};
