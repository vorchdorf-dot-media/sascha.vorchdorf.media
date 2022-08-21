const feathericons = require('eleventy-plugin-feathericons');
const pwa = require('@piraces/eleventy-plugin-pwa');
const rss = require('@11ty/eleventy-plugin-rss');

module.exports = [
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
