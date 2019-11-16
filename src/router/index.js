import Vue from "vue";
import VueRouter from "vue-router";
import Users from "../views/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "users",
    component: Users
  },
  {
    path: "/page/:page",
    name: "users-page",
    component: Users
  },
  {
    path: "/",
    name: "todoList",
    component: () => import("../views/TodoList.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
