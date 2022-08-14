const collections = require('./_11ty/collections');
const filters = require('./_11ty/filters');
const plugins = require('./_11ty/plugins');
const shortcodes = require('./_11ty/shortcodes');
const transforms = require('./_11ty/transforms');

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

  Object.keys(collections).forEach((collection) =>
    config.addCollection(collection, collections[collection]),
  );

  Object.keys(filters).forEach((filter) =>
    config.addFilter(filter, filters[filter]),
  );

  Object.keys(shortcodes).forEach((shortcode) =>
    config.addAsyncShortcode(shortcode, shortcodes[shortcode]),
  );

  Object.keys(transforms).forEach((transform) =>
    config.addTransform(transform, transforms[transform]),
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
