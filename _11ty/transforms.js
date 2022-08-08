const posthtml = require('posthtml');
const minifier = require('posthtml-minifier');
const { postHtmlPlugin: eleventyHelmet } = require('eleventy-plugin-helmet');

module.exports = {
  async html(content) {
    if (!this.outputPath || !this.outputPath.endsWith('.html')) {
      return content;
    }

    return posthtml()
      .use(eleventyHelmet)
      .use(
        minifier({
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeEmptyElements: true,
          // removeOptionalTags: true,
        }),
      )
      .process(content)
      .then(({ html }) => html);
  },
};
