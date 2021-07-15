import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Logout from "../views/Logout.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import NotFound from "../views/NotFound.vue";
import PasswordGenerator from "../views/PasswordGenerator.vue";
import AddNewCredential from "../views/AddNewCredential.vue";
import Register from "../views/Register.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  { path: "/about", name: "About", component: About },
  { path: "/signup", name: "Signup", component: Signup },
  {
    path: "/passwordgenerator",
    name: "PasswordGenerator",
    component: PasswordGenerator,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    // beforeEnter: (to, from, next) => {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       next("/");
    //     } else {
    //       next();
    //     }
    //   });
    // },
  },
  { path: "/register", name: "Register", component: Register },
  { path: "/logout", name: "Logout", component: Logout },
  { path: "*", name: "NotFound", component: NotFound },
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          next("/login");
        } else {
          next();
        }
      });
    },
  },
  {
    path: "/addnewcredential",
    name: "AddNewCredential",
    component: AddNewCredential,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          next("/login");
        } else {
          next();
        }
      });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {

// });

export default router;
