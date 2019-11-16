<template>
  <div class="users">
    <h1 :class="isLoading ? 'loading' : false">List of users</h1>
    <Paginator
      :current="currentPage"
      :lastPage="lastPage"
      :disable="isRequesting"
      class="visible-xs"
    />
    <Table :columns="columns" :rows="rows" :error="error" :class="isLoading ? 'loading' : false" />
    <Paginator
      :current="currentPage"
      :lastPage="lastPage"
      :disable="isRequesting"
    />
  </div>
</template>

<script>
import axios from "axios";
import mixinLoader from "@/mixins/loader";
import Table from "@/components/Table.vue";
import Paginator from "@/components/Paginator.vue";

export default {
  name: "users",

  data() {
    return {
      error: "",
      url: "https://jsonplaceholder.typicode.com/users",
      columns: [
        { id: "name", name: "Name", type: "string", style: "width: 30%" },
        { id: "email", name: "Email", type: "string" },
        { id: "phone", name: "Phone", type: "phone", style: "width: 170px" }
      ],
      currentPage: 1,
      lastPage: 1,
      totalRows: 0,
      rowsPerPage: 5,
      rows: false,
      isRequesting: false
    };
  },

  mixins: [mixinLoader],

  methods: {
    getCurrentPage() {
      this.currentPage = 1;
      if (this.$route.params.page) {
        this.currentPage = parseInt(this.$route.params.page, 10);
        if (isNaN(this.currentPage) || this.currentPage < 1)
          this.$router.replace("/").catch(() => {});
      }
    },
    getList() {
      this.error = "";

      this.setLoader(true);
      this.isRequesting = true;
      axios
        .get(`${this.url}?_page=${this.currentPage}&_limit=${this.rowsPerPage}`)
        .then(answer => {
          if (answer && answer.status === 200) {
            if (answer.headers && answer.headers["x-total-count"]) {
              this.totalRows = parseInt(answer.headers["x-total-count"], 10);
              if (isNaN(this.totalRows)) this.totalRows = 0;
            }

            let pagesCount = Math.ceil(this.totalRows / this.rowsPerPage);
            if (!pagesCount || isNaN(pagesCount) || pagesCount < 1)
              pagesCount = 1;
            this.lastPage = pagesCount;
            if (this.currentPage > this.lastPage)
              return this.$router
                .replace(`/page/${this.lastPage}`)
                .catch(() => {});

            if (answer.data && answer.data.length)
              this.rows = answer.data.slice();
            else this.rows = [];
          }
        })
        .catch(error => {
          this.error = "Data is not accessable...";
          if (error && error.message) this.error = error.message;
        })
        .then(() => {
          this.setLoader(false);
          this.isRequesting = false;
        });
    }
  },

  watch: {
    $route: {
      handler() {
        this.getCurrentPage();
        this.getList();
      },
      immediate: true
    }
  },

  components: {
    Table,
    Paginator
  }
};
</script>
