<template>
  <div class="paginator">
    <div class="navigator">
      <div v-for="(link, id) in links" :key="id" :class="id">
        <router-link v-if="link.href" :to="link.href" v-html="link.text">
        </router-link>
        <span v-else v-html="link.text"></span>
      </div>
    </div>
    <div class="pages"></div>
  </div>
</template>

<script>
export default {
  name: "Paginator",

  props: {
    current: {
      required: true,
      type: Number
    },
    lastPage: {
      required: true,
      type: Number
    },
    disable: {
      required: true,
      type: Boolean
    }
  },

  data() {
    return {
      links: {
        first: { text: "&laquo;", href: null },
        prev: { text: "&lsaquo;", href: null },
        current: { text: null, href: null },
        next: { text: "&rsaquo;", href: null },
        last: { text: "&raquo;", href: null }
      }
    };
  },

  methods: {
    initLinks() {
      let prev = this.current - 1;
      let next = this.current + 1;

      this.links.first.href = this.current > 1 ? "/" : null;
      this.links.prev.href =
        this.current <= 1 ? null : prev <= 1 ? "/" : `/page/${prev}`;
      this.links.current.text = this.current;
      this.links.next.href = next <= this.lastPage ? `/page/${next}` : null;
      this.links.last.href =
        this.current < this.lastPage ? `/page/${this.lastPage}` : null;
    }
  },

  watch: {
    current: {
      handler() {
        this.initLinks();
      },
      immediate: true
    },
    lastPage: {
      handler() {
        this.initLinks();
      },
      immediate: true
    },
    disable: {
      handler(value) {
        if (value) {
          for (let id in this.links) {
            this.links[id].href = null;
          }
        }
        else this.initLinks();
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
.paginator {
  &.visible-xs {
    display: none;
  }
  div {
    display: inline-block;
    margin: 0;
    padding: 0;
    &.current span {
      background: white;
      color: black;
    }
  }
  a,
  span {
    float: left;
    display: inline-block;
    width: 30px;
    height: 19px;
    line-height: 19px;
    background-color: #ccc;
    color: #fff;
    margin: 10px 1px;
    text-align: center;
  }

  a {
    text-decoration: none;
    background-color: #666;
    color: #fff;
  }

  @media (max-width: 640px) {
    text-align: center;
    &.visible-xs {
      display: block;
    }
  }
}
</style>
