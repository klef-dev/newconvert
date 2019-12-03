import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Converts from "../views/Converts.vue";
import Settings from "../views/Settings.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Converts
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
