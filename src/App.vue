<template>
  <div id="app" class="container">
    <Navbar />

    <router-view />
  </div>
</template>

<script>
// import firebase from "firebase";
import Navbar from "@/components/Nav.vue";

export default {
  components: { Navbar },
  beforeMount() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   // console.log(user, this.$router.currentRoute);
    //   if (!user) {
    //     if (this.$router.currentRoute.name != "Login") {
    //       this.$router.push("/login");
    //     }
    //   } else if (
    //     this.$router.currentRoute.name == "Login" ||
    //     this.$router.currentRoute.name == "Register"
    //   ) {
    //     this.$router.push("/");
    //   }
    // });
  },
};
</script>

<style lang="scss">
body,
html {
  // padding: 0;
  // margin: 0;
  // width: 100%;
  min-height: 100vh;
}
body {
  background-color: #f2f2f2;
}
// body{
// max-width: 500px;
//   margin: auto;
// }
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-box-align: center;
//   text-align: center;
//   max-width: 500px;

// }

// a {
//   color: inherit;
// }
</style>
