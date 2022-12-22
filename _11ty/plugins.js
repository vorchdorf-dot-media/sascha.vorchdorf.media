const amp = require('@ampproject/eleventy-plugin-amp');
const feathericons = require('eleventy-plugin-feathericons');
const pwa = require('@piraces/eleventy-plugin-pwa');
const rss = require('@11ty/eleventy-plugin-rss');

const getBaseUrl = require('../src/_data/url');

module.exports = [
  [
    amp,
    {
      ampCache: false,
      // ampRuntimeHost: getBaseUrl(),
      dir: {
        output: 'dist',
      },
      // downloadAmpRuntime: true,
      filter: /^dist\/.+\/(story|.+\.amp)\.html$/i,
      imageOptimization: false,
      validation: false,
    },
  ],
  [feathericons],
  [
    pwa,
    {
      swDest: 'dist/sw.js',
      globDirectory: 'dist',
      cacheId: 'sascha-offline',
      globPatterns: [
        '**/*.{css,js,mjs,map,avif,jpg,jpeg,png,gif,webp,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}',
      ],
      runtimeCaching: [
        {
          urlPattern:
            /^.*\.(html|css|avif|jpg|jpeg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: /^https:\/\/cdn.ampproject.org\//,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /^https:\/\/cdnjs.cloudflare.com\/ajax\/libs\//,
          handler: 'CacheFirst',
        },
      ],
    },
  ],
  [rss],
];
