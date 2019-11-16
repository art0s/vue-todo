const Mixin = {
  data() {
    return {
      isLoading: false,
      loaderTimer: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.loaderTimer);
  },
  methods: {
    setLoader(what) {
      clearTimeout(this.loaderTimer);

      if (what) {
        if (this.isLoading) return;
      } else {
        if (!this.isLoading) return;
      }

      this.loaderTimer = setTimeout(
        () => {
          this.isLoading = what;
        },
        what ? 100 : 400
      );
    }
  }
};

export default Mixin;
