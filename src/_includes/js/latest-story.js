document.addEventListener('alpine:init', () => {
  const TWENTYFOUR_HOURS = 24 * 60 * 60 * 1000;

  Alpine.data('latestStory', (date, permalink) => ({
    date: new Date(date),
    permalink,

    init() {
      const loader = document.querySelector('svg[data-loader]');
      const a = document.querySelector('a[data-avatar]');

      if (!loader || !a) {
        return null;
      }

      const isLatestStoryShown = Date.now() < date.valueOf() + TWENTYFOUR_HOURS;

      if (isLatestStoryShown) {
        a.setAttribute('href', this.permalink);
        a.setAttribute('target', '_blank');
      }
      loader.style.display = isLatestStoryShown ? 'block' : 'none';
    },
  }));
});
