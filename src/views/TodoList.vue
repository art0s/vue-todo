<template>
  <div class="about">
    <h1>User Todo List</h1>
    <span class="btn" @click="back">{{ backButtonTitle }}</span>
    <h3>User's information:</h3>
    <div v-for="(user, key) in $store.state.userData" :key="key">
      <strong>{{ key }}:</strong>
      <template v-if="typeof user !== 'object'">{{ user }}</template>
      <template v-else>
        <br />
        <div v-for="(info, fld) in user" :key="fld" style="padding-left: 20px">
          {{ fld }} - {{ info }}
        </div>
      </template>
    </div>
    <h3>User's Todo List</h3>
    <Table
      :columns="columns"
      :rows="rows"
      :error="error"
      :class="isLoading ? 'loading' : false"
    />
  </div>
</template>

<script>
import axios from "axios";
import mixinLoader from "@/mixins/loader";
import Table from "@/components/Table.vue";

export default {
  name: "todoList",

  data() {
    return {
      error: "",
      url: "https://jsonplaceholder.typicode.com/todos",
      urlUser: "https://jsonplaceholder.typicode.com/users",
      columns: [
        { id: "title", name: "Title", type: "string" },
        {
          id: "completed",
          name: "Completed",
          type: "bool",
          style: "width: 70px"
        }
      ],
      rows: false,
      isRequesting: false,
      userId: null
    };
  },

  computed: {
    backButtonTitle() {
      if (window && window.history && window.history.length > 2) return "Back";
      else return "List";
    }
  },

  mixins: [mixinLoader],

  created() {
    this.userId = this.$route.params.id;
    this.getUser();
    this.getList();
  },

  methods: {
    back() {
      if (window && window.history && window.history.length > 2)
        this.$router.go(-1);
      else this.$router.push("/");
    },
    getUser() {
      if (this.$store.state.userData) return;
      axios
        .get(`${this.urlUser}?id=${this.userId}`)
        .then(answer => {
          if (
            answer &&
            answer.status === 200 &&
            answer.data &&
            answer.data.length
          )
            this.$store.dispatch("setUserData", answer.data[0]);
        })
        .catch(() => {});
    },
    getList() {
      this.error = "";

      this.setLoader(true);
      this.isRequesting = true;
      axios
        .get(`${this.url}?userId=${this.userId}`)
        .then(answer => {
          if (
            answer &&
            answer.status === 200 &&
            answer.data &&
            answer.data.length
          )
            this.rows = answer.data.slice();
          else this.rows = [];
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

  components: {
    Table
  }
};
</script>

<style scoped lang="scss">
.btn {
  float: right;
  font-size: 12px;
  padding: 4px 16px;
  background-color: #0070ff;
  transition: background-color 0.2s;
  cursor: pointer;
  color: white;
  border-radius: 4px;
  &:hover {
    background-color: #0051b9;
  }
}
</style>
