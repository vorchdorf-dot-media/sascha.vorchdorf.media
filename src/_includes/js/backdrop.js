document.addEventListener('alpine:init', () => {
  Alpine.data('backdrop', (items = 0) => ({
    index: 0,
    items,
    open: false,
    scrollLeft: 0,
    scrollWidth: 0,

    init() {
      this.$watch('open', (value) => {
        document.body.style.overflow = value ? 'hidden' : 'initial';
        if (!value) {
          return null;
        }

        this.scrollWidth = document.querySelector('.slider')?.scrollWidth ?? 0;

        const el = document.querySelector(
          '.backdrop figure:nth-child(' + this.index + ')',
        );
        setTimeout(() => {
          el?.scrollIntoView();
        }, 50);
      });
    },
    closeBackdrop() {
      this.open = false;
    },
    handleScroll(e) {
      const { target } = e;
      this.scrollLeft = target.scrollLeft;
      const factor =
        Math.floor(this.items * (this.scrollLeft / this.scrollWidth)) + 1;

      this.index = Math.min(
        this.items,
        Math.max(1, factor === Infinity ? 0 : factor),
      );
    },
    next() {
      this.index = Math.min(this.items, this.index + 1);
      const el = document.querySelector(
        '.backdrop figure:nth-child(' + this.index + ')',
      );
      el.scrollIntoView();
    },
    openBackdrop() {
      this.open = true;
    },
    previous() {
      this.index = Math.max(1, this.index - 1);
      const el = document.querySelector(
        '.backdrop figure:nth-child(' + this.index + ')',
      );
      el.scrollIntoView();
    },
    setIndex(index) {
      this.index = index;
    },
  }));
});
