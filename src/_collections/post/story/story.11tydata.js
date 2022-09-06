module.exports = {
  eleventyComputed: {
    amp: true,
    permalink: ({ post }) => {
      return (
        post.attachments?.length &&
        `/post/${post.permalink ?? post.slug}/story.html`
      );
    },
  },
};
