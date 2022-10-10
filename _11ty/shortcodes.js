const cheerio = require('cheerio');
const { createHash } = require('crypto');
const Image = require('@11ty/eleventy-img');

const CACHE_OPTIONS = {
  cacheOptions: {
    duration: '1y',
    directory: '.cache',
    removeUrlQueryParams: false,
  },
};

const generateImageHTML = async (
  src,
  alt,
  widths = [null],
  sizes = '100vw',
  customAttributes = {},
) => {
  const options = {
    ...CACHE_OPTIONS,
    formats: ['avif', 'webp', 'jpeg'],
    widths,
    outputDir: 'dist/img',
  };

  const metadata = await Image(src, options);

  const { formats } = options;
  const [{ height, width }] = metadata[formats[formats.length - 1]];

  const attributes = {
    alt,
    height: height,
    sizes,
    loading: 'lazy',
    decoding: 'async',
    width: width,
    ...customAttributes,
  };

  const html = Image.generateHTML(metadata, attributes);

  const $ = cheerio.load(html, null, false);

  $('img').attr('height', height).attr('width', width);

  return $.html();
};

const generateAMPImageHTML = async (
  src,
  alt,
  widths = [null],
  formats = ['jpeg'],
  customAttributes = {},
) => {
  const options = {
    ...CACHE_OPTIONS,
    formats,
    widths,
    outputDir: 'dist/img',
  };

  const metadata = await Image(src, options);

  const [{ height, width }] = metadata[formats[formats.length - 1]];

  const attributes = {
    alt,
    height,
    width,
    layout: 'responsive',
    ...customAttributes,
  };

  const generateHTML = (i = formats.length - 1, children = '') => {
    if (i < 0) {
      return children;
    }

    const $ = cheerio.load('<amp-img></amp-img>', null, false);

    const srcset = metadata[formats[i]].reduce((prev, curr) => {
      return prev ? [prev, curr.srcset].join(', ') : curr.srcset;
    }, null);

    const imgAttributes = {
      ...attributes,
      src: metadata[formats[i]][0].url,
      srcset,
      ...(i !== 0 ? { fallback: 'fallback' } : {}),
    };

    Object.keys(imgAttributes).forEach((attribute) =>
      $('amp-img').attr(attribute, imgAttributes[attribute]),
    );

    $('amp-img').html(children);

    return generateHTML(i - 1, $.html());
  };

  return generateHTML();
};

module.exports = {
  async image(
    src,
    alt,
    widths = [null],
    sizes = '100%',
    customAttributes = {},
  ) {
    return generateImageHTML(src, alt, widths, sizes, customAttributes);
  },

  async gravatar(email, name, sizes = '100vw', fallback = 'robohash') {
    const hash = createHash('md5').update(email).digest('hex');
    const size = 256;

    const src = new URL(
      `/avatar/${hash}?size=${size}&d=${fallback}`,
      'https://gravatar.com',
    ).toString();

    return generateImageHTML(
      src,
      `Profilbild von ${name}`,
      [96, 128, null],
      sizes,
    );
  },

  async amp_image(
    src,
    alt,
    widths = [null],
    formats = ['jpeg'],
    customAttributes = {},
  ) {
    return generateAMPImageHTML(src, alt, widths, formats, customAttributes);
  },

  async og_image(src, widths = [1200], formats = ['jpeg']) {
    const options = {
      ...CACHE_OPTIONS,
      formats,
      widths,
      outputDir: 'dist/img',
    };

    const {
      jpeg: [{ url }],
    } = await Image(src, options);

    return url;
  },
};
