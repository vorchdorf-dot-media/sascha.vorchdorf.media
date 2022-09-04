import got from 'got';
import gql from 'gql-tag';

import pkg from '../../../../package.json';

const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;
const GITHUB_API_ENDPOINT = 'https://api.github.com/graphql';

const QUERY = gql`
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

export type ExpectedHeadOidResponse = {
  data: null | {
    repository: {
      ref: {
        target: {
          oid: string;
        };
      };
    };
  };
  errors?: unknown[];
};

export default async () => {
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

  const res = await got<ExpectedHeadOidResponse>(GITHUB_API_ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `bearer ${GITHUB_API_TOKEN}`,
      'content-type': 'application/json',
    },
    body: body.toString(),
    responseType: 'json',
  });

  if (res.body.errors || !res.body.data) {
    throw new Error(
      (res.body.errors as any) ?? 'Request fetching last commit ID failed!',
    );
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
