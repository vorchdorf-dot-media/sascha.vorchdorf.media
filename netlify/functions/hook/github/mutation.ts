import got from 'got';
import gql from 'gql-tag';

import pkg from '../../../../package.json';

const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;
const GITHUB_API_ENDPOINT = 'https://api.github.com/graphql';

const MUTATION = gql`
  mutation createCommitOnBranch($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) {
      commit {
        oid
      }
    }
  }
`;

const DEFAULT_INPUT = {
  branch: {
    repositoryNameWithOwner: new URL(pkg.repository).pathname
      .replace(/^\//, '')
      .replace(/\/$/, ''),
    branchName: 'main',
  },
  expectedHeadOid: '',
  message: {
    headline: 'chore: auto-update of wordpress data',
  },
};

export type CreateCommitOnBranchResponse = {
  data: null | {
    createCommitOnBranch: {
      commit: {
        oid: string;
      };
    };
  };
  errors?: unknown[];
};

export default async (
  fileChanges: { additions: { path: string; contents: string }[] },
  expectedHeadOid: string,
) => {
  const input = {
    ...DEFAULT_INPUT,
    expectedHeadOid,
    fileChanges,
  };

  const body = {
    variables: {
      input,
    },
    query: MUTATION,
  };

  return got<CreateCommitOnBranchResponse>(GITHUB_API_ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `bearer ${GITHUB_API_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
    responseType: 'json',
  });
};
