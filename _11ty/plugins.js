const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');
const feathericons = require('eleventy-plugin-feathericons');
const pwa = require('@piraces/eleventy-plugin-pwa');
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
  [
    pwa,
    {
      swDest: 'dist/sw.js',
      globDirectory: 'dist',
    },
  ],
  [rss],
];
