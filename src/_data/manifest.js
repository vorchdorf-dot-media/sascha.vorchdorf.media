const pkg = require('../../package.json');

module.exports = {
  name: 'Sascha ist offline.',
  short_name: pkg.short_name,
  start_url: '.',
  display: 'standalone',
  background_color: '#F6FAFE',
  theme_color: pkg.color,
  description: pkg.description,
  icons: [
    {
      src: '/img/rounded-192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/img/rounded-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/img/maskable-192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/img/maskable-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
};
