const cheerio = require('cheerio');
const { createHash } = require('crypto');
const Image = require('@11ty/eleventy-img');

const generateImageHTML = async (
  src,
  alt,
  widths = [null],
  sizes = '100%',
  customAttributes = {},
) => {
  const options = {
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

  async gravatar(email, name, sizes = '100%', fallback = 'robohash') {
    const hash = createHash('md5').update(email).digest('hex');
    const size = 256;

    const src = new URL(
      `/avatar/${hash}?size=${size}&d=${fallback}`,
      'https://gravatar.com',
    ).toString();

    return generateImageHTML(
      src,
      `Profilbild von ${name}`,
      [64, 128, null],
      sizes,
    );
  },

  async og_image(src, widths = [1200], formats = ['jpeg']) {
    const options = {
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
