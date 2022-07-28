const filters = require('./_11ty/filters');
const plugins = require('./_11ty/plugins');

module.exports = (config) => {
  const copyOptions = {
    debug: true,
    expand: true,
  };

  config.addPassthroughCopy({ 'src/_data/**/*.json': './' }, copyOptions);
  config.addPassthroughCopy({ public: './' }, copyOptions);

  plugins.forEach(([plugin, pluginConfig]) =>
    config.addPlugin(plugin, pluginConfig),
  );

  Object.keys(filters).forEach((filter) =>
    config.addFilter(filter, filters[filter]),
  );

  return {
    dir: {
      data: '_data',
      includes: '_includes',
      input: 'src',
      layouts: '_layouts',
      output: 'dist',
    },
  };
};
