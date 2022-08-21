module.exports = () => {
  if (process.env.CONTEXT !== 'production') {
    return (
      process.env.PREVIEW_URL ?? process.env.URL ?? 'http://localhost:8888'
    );
  }
  return process.env.URL ?? pkg.homepage;
};
