const mutation = require('./mutation');
const query = require('./query');

module.exports = {
  getExpectedHeadOid: query,
  createCommitOnBranch: mutation,
};
