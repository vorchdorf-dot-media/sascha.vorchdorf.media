module.exports = {
  eleventyComputed: {
    featured_image: ({ post: { featured_media, attachments } }) => {
      return (
        featured_media && attachments.find(({ id }) => featured_media === id)
      );
    },
    permalink: ({ post }) => {
      return `/post/${post.permalink ?? post.slug}/`;
    },
    title: ({
      post: {
        title: { rendered: title },
      },
    }) => {
      return title;
    },
    tldr: ({
      post: {
        excerpt: { rendered: excerpt },
      },
      tldr,
    }) => {
      return tldr || excerpt.replace(/(<([^>]+)>)/gi, '');
    },
  },
};
