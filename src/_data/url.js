module.exports = () => {
  if (process.env.NODE_ENV !== 'production') {
    return (
      process.env.DEPLOY_PRIME_URL ?? process.env.URL ?? 'http://localhost:8888'
    );
  }
  return process.env.URL ?? 'http://localhost:8888';
};
