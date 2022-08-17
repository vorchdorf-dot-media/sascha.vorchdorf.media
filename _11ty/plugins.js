const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');
const feathericons = require('eleventy-plugin-feathericons');
const rss = require('@11ty/eleventy-plugin-rss');

module.exports = [
  [
    EleventyServerlessBundlerPlugin,
    {
      name: 'stories',
      functionsDir: 'netlify/functions',
    },
  ],
  [feathericons],
  [rss],
];
