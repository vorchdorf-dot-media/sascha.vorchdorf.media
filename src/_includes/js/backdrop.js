document.addEventListener('alpine:init', () => {
  Alpine.data('story', (permalink) => ({
    open: false,
    permalink,

    init() {
      this.$watch('open', (value) => {
        document.body.style.overflow = value ? 'hidden' : 'initial';
      });
    },

    closeBackdrop() {
      this.open = false;
    },

    openBackdrop(e) {
      e.preventDefault();
      this.open = true;
    },
  }));
});
